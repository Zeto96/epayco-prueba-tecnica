const { validateWalletBalanceData, validateWalletRechargeData } = require("../../validators/validator");

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

    wallet_balance: function(args) {
        const validationResult = validateWalletBalanceData(args);
        if (!validationResult.isValid) {
            return {
                success: false,
                message_error: validationResult.errors.join(", "),
                cod_error: 400
            };
        }

        const { document_id, phone } = args;

        return {
            success: true,
            message_success: "Saldo consultado correctamente",
            cod_error: 0o0,
            data: {
                document_id,
                phone
            }
        };
    }
};

module.exports = { walletService };
