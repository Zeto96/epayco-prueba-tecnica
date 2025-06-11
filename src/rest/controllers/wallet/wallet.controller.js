const SoapClient = require("../../utils/soap-client");

const wallet_recharge = async (req, res) => {
    try {
        const { document_id, phone, amount } = req.body;

        const result = await SoapClient.callSoapMethod("wallet_recharge", {
            document_id,
            phone,
            amount
        });

        if (result.success) {
            return res.status(200).json({
                success: true,
                message_success: result.message_success,
                cod_error: result.cod_error,
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message_error: result.message_error,
                cod_error: result.cod_error
            });
        }
    } catch (error) {
        console.error("Error en recarga de wallet:", error);
        return res.status(500).json({
            success: false,
            message_error: "Error interno del servidor",
            cod_error: 500
        });
    }
};

const wallet_balance = async (req, res) => {
    try {
        const { document_id, phone } = req.body;

        const result = await SoapClient.callSoapMethod("wallet_balance", {
            document_id,
            phone
        });

        if (result.success) {
            return res.status(200).json({
                success: true,
                message_success: result.message_success,
                cod_error: result.cod_error,
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message_error: result.message_error,
                cod_error: result.cod_error
            });
        }
    } catch (error) {
        console.error("Error al consultar saldo:", error);
        return res.status(500).json({
            success: false,
            message_error: "Error interno del servidor",
            cod_error: 500
        });
    }
};

const wallet_payment = async (req, res) => {
    try {
        const { document_id, phone, amount } = req.body;

        const result = await SoapClient.callSoapMethod("wallet_payment", {
            document_id,
            phone,
            amount
        });

        if (result.success) {
            return res.status(200).json({
                success: true,
                message_success: result.message_success,
                cod_error: result.cod_error,
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message_error: result.message_error,
                cod_error: result.cod_error
            });
        }
    } catch (error) {
        console.error("Error al iniciar pago:", error);
        return res.status(500).json({
            success: false,
            message_error: "Error interno del servidor",
            cod_error: 500
        });
    }
};

const confirm_payment = async (req, res) => {
    try {
        const { session_id, token } = req.body;

        const result = await SoapClient.callSoapMethod("confirm_payment", {
            session_id,
            token
        });

        if (result.success) {
            return res.status(200).json({
                success: true,
                message_success: result.message_success,
                cod_error: result.cod_error,
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message_error: result.message_error,
                cod_error: result.cod_error
            });
        }
    } catch (error) {
        console.error("Error al confirmar pago:", error);
        return res.status(500).json({
            success: false,
            message_error: "Error interno del servidor",
            cod_error: 500
        });
    }
};

module.exports = {
    wallet_recharge,
    wallet_balance,
    wallet_payment,
    confirm_payment
};