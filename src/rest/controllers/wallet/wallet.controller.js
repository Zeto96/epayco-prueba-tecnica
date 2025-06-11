const SoapClient = require("../../utils/soap-client");

const wallet_recharge = (req, res) => {
    const { document_id, phone, amount } = req.body;
    console.log("🚀 ~ constwallet_recharge= ~ document_id:", document_id)
    console.log("🚀 ~ constwallet_recharge= ~ amount:", amount)
    console.log("🚀 ~ constwallet_recharge= ~ phone:", phone)
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

module.exports = {
    wallet_recharge,
    wallet_balance
};