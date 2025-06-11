const { validateWalletBalanceData, validateWalletRechargeData } = require("../../validators/validator");
const { Customer } = require("../../../models/customers");
const { Wallet } = require("../../../models/wallet");

const walletService = {
    wallet_recharge: function(args) {
        const validationResult = validateWalletRechargeData(args);
        if (!validationResult.isValid) {
            return {
                success: false,
                message_error: validationResult.errors.join(", "),
                cod_error: 400
            };
        }

        const { document_id, phone, amount } = args;

        return {
            success: true,
            message_success: "Recarga de saldo exitosa",
            cod_error: 0o0,
            data: {
                document_id,
                phone,
                amount
            }
        }
    },

    wallet_balance: async function(args) {
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

            const wallet = await Wallet.findOne({document_id, phone});

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
