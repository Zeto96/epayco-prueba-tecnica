const { validateCustomerData } = require("../../validators/validator");

const customerService = {
    create_customer: function (args) {
        const validationResult = validateCustomerData(args);

        if (!validationResult.isValid) {
            return {
                success: false,
                message_error: validationResult.errors.join(", "),
                cod_error: 400
            };
        };

        const { names, last_names, email, document_id, phone } = args;



        return {
            success: true,
            message_success: "Cliente creado correctamente",
            cod_success: 200,
            data: {
                names,
                last_names,
                email,
                document_id,
                phone
            }
        };
    }
};

module.exports = { customerService };
