const { validateWalletBalanceData, validateWalletRechargeData } = require("../../validators/validator");
const { Customer } = require("../../../models/customers");
const { Wallet } = require("../../../models/wallet");

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
    }
};

module.exports = { walletService };
