const SoapClient = require("../../utils/soap-client");

const create_customer = async (req, res) => {
    try {
        const { names, last_names, email, document_id, phone } = req.body;

        const result = await SoapClient.callSoapMethod("create_customer", {
            names,
            last_names,
            email,
            document_id,
            phone
        });

        if (result.success) {
            return res.status(201).json({
                success: true,
                message_success: result.message_success || "Cliente creado correctamente",
                cod_error: result.cod_error || 0o0,
                data: result.data
            });
        } else {
            return res.status(400).json({
                success: false,
                message_error: result.message_error || "Error al crear el cliente",
                cod_error: result.cod_error || 400
            });
        }

    } catch (error) {
        console.error("Error al crear el cliente:", error);
        return res.status(500).json({
            success: false,
            message_error: "Error interno del servidor",
            cod_error: 500
        });
    }
};

module.exports = {
    create_customer
};
