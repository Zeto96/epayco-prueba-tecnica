const {
    validateWalletBalanceData,
    validateWalletRechargeData,
    validateWalletPaymentData,
    validatePaymentConfirmationData
} = require("../../validators/validator");
const { Customer } = require("../../../models/customers");
const { Wallet } = require("../../../models/wallet");
const { sendPaymentToken } = require("../../../utils/email");

const walletService = {
    wallet_recharge: async function (args) {
        try {
            const validationResult = validateWalletRechargeData(args);
            if (!validationResult.isValid) {
                return {
                    success: false,
                    message_error: validationResult.errors.join(", "),
                    cod_error: 400
                };
            }

            const { document_id, phone, amount } = args;
            const amountNumber = parseFloat(amount);

            const customer = await Customer.findOne({ document_id, phone });

            if (!customer) {
                return {
                    success: false,
                    message_error: "Cliente no encontrado",
                    cod_error: 400
                };
            }

            const wallet = await Wallet.findOne({ document_id, phone });

            if (!wallet) {
                return {
                    success: false,
                    message_error: "Billetera no encontrada",
                    cod_error: 400
                };
            }

            const transaction = {
                type: 'recharge',
                amount: amountNumber,
                description: 'Recarga de saldo'
            }

            wallet.balance += amountNumber;
            wallet.transactions.push(transaction);
            await wallet.save();

            return {
                success: true,
                message_success: "Recarga de saldo exitosa",
                cod_error: 0o0,
                data: {
                    document_id,
                    phone,
                    amount: amountNumber,
                    balance: wallet.balance,
                    transaction_id: wallet.transactions[wallet.transactions.length - 1]._id.toString(),
                }
            }
        } catch (error) {
            console.error("Error en recarga de wallet:", error);
            return {
                success: false,
                message_error: "Error interno del servidor",
                cod_error: 500
            };
        }
    },

    wallet_balance: async function (args) {
        try {
            const validationResult = validateWalletBalanceData(args);
            if (!validationResult.isValid) {
                return {
                    success: false,
                    message_error: validationResult.errors.join(", "),
                    cod_error: 400
                };
            }

            const { document_id, phone } = args;

            const wallet = await Wallet.findOne({ document_id, phone });

            if (!wallet) {
                return {
                    success: false,
                    message_error: "Billetera no encontrada",
                    cod_error: 400
                };
            }

            return {
                success: true,
                message_success: "Saldo consultado correctamente",
                cod_error: 0o0,
                data: {
                    document_id,
                    phone,
                    balance: wallet.balance,
                    updated_at: wallet.updated_at
                }
            };
        } catch (error) {
            console.error("Error al consultar el saldo de la billetera:", error);
            return {
                success: false,
                message_error: "Error interno del servidor",
                cod_error: 500
            };
        }
    },

    wallet_payment: async function (args) {
        try {
            const validationResult = validateWalletPaymentData(args);
            if (!validationResult.isValid) {
                return {
                    success: false,
                    message_error: validationResult.errors.join(", "),
                    cod_error: 400
                };
            }

            const { document_id, phone, amount } = args;
            const amountNumber = parseFloat(amount);

            const customer = await Customer.findOne({ document_id, phone });

            if (!customer) {
                return {
                    success: false,
                    message_error: "Cliente no encontrado",
                    cod_error: 400
                };
            }

            const wallet = await Wallet.findOne({ document_id, phone });

            if (!wallet) {
                return {
                    success: false,
                    message_error: "Billetera no encontrada",
                    cod_error: 400
                };
            }

            if (wallet.balance < amountNumber) {
                return {
                    success: false,
                    message_error: "Saldo insuficiente para realizar el pago",
                    cod_error: 400
                };
            }

            const { session_id, token } = wallet.generatePaymentToken(amountNumber);

            await wallet.save();

            const emailSent = await sendPaymentToken(
                customer.email,
                token,
                session_id,
                amountNumber
            );

            if (!emailSent) {
                wallet.pending_payments = wallet.pending_payments.filter(
                    payment => payment.session_id !== session_id
                );
                await wallet.save();

                return {
                    success: false,
                    message_error: "No se pudo enviar el token de confirmación",
                    cod_error: 500
                };
            }

            return {
                success: true,
                message_success: "Se ha enviado un código de confirmación a tu email",
                cod_error: 0o0
            };
        } catch (error) {
            console.error("Error al iniciar proceso de pago:", error);
            return {
                success: false,
                message_error: "Error interno del servidor",
                cod_error: 500
            };
        }
    },

    confirm_payment: async function (args) {
        try {
            const validationResult = validatePaymentConfirmationData(args);
            if (!validationResult.isValid) {
                return {
                    success: false,
                    message_error: validationResult.errors.join(", "),
                    cod_error: 400
                };
            }

            const { session_id, token } = args;

            const wallet = await Wallet.findOne({
                "pending_payments.session_id": session_id
            });

            if (!wallet) {
                return {
                    success: false,
                    message_error: "Sesión de pago no encontrada",
                    cod_error: 400
                };
            }

            const verification = wallet.validatePaymentToken(session_id, token);

            if (!verification.success) {
                return {
                    success: false,
                    message_error: verification.message_error,
                    cod_error: 400
                };
            }

            const pendingPayment = verification.data;

            if (wallet.balance < pendingPayment.amount) {
                return {
                    success: false,
                    message_error: "Saldo insuficiente para realizar el pago",
                    cod_error: 400
                };
            }

            wallet.balance -= pendingPayment.amount;

            wallet.transactions.push({
                type: 'payment',
                amount: pendingPayment.amount,
                description: "Pago confirmado",
                reference: session_id
            });

            wallet.pending_payments = wallet.pending_payments.filter(
                payment => payment.session_id !== session_id
            );

            await wallet.save();
            
            return {
                success: true,
                message_success: "Pago realizado correctamente",
                cod_error: 0o0,
                data: {
                    amount: pendingPayment.amount,
                    balance: wallet.balance,
                    transaction_id: wallet.transactions[wallet.transactions.length - 1]._id.toString()
                }
            };
        } catch (error) {
            console.error("Error al iniciar proceso de pago:", error);
            return {
                success: false,
                message_error: "Error interno del servidor",
                cod_error: 500
            };
        }
    }
};

module.exports = { walletService };
