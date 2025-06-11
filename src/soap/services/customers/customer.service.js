const { validateCustomerData } = require("../../validators/validator");
const { Customer } = require("../../../models/customers");
const { Wallet } = require("../../../models/wallet");

const customerService = {
    create_customer: async function (args) {
        try {
            const validationResult = validateCustomerData(args);

            if (!validationResult.isValid) {
                return {
                    success: false,
                    message_error: validationResult.errors.join(", "),
                    cod_error: 400
                };
            };

            const { names, last_names, email, document_id, phone } = args;

            const existingCustomer = await Customer.findOne({
                $or: [
                    { document_id },
                    { email },
                    { phone }
                ]
            });

            if (existingCustomer) {
                return {
                    success: false,
                    message_error: "Ya existe un cliente con el mismo documento, email o teléfono",
                    cod_error: 400
                }
            }

            const newCustomer = new Customer({
                names,
                last_names,
                email,
                document_id,
                phone
            });

            const savedCustomer = await newCustomer.save();

            const newWallet = new Wallet({
                customer_id: savedCustomer._id,
                document_id,
                phone,
                balance: 0,
                transactions: []
            });

            await newWallet.save();

            return {
                success: true,
                message_success: "Cliente creado correctamente",
                cod_error: 0o0,
                data: {
                    id: savedCustomer._id.toString(),
                    names: savedCustomer.names,
                    last_names: savedCustomer.last_names,
                    email: savedCustomer.email,
                    document_id: savedCustomer.document_id,
                    phone: savedCustomer.phone,
                    created_at: savedCustomer.created_at
                }
            };
        } catch (error) {
            return {
                success: false,
                message_error: error.message,
                cod_error: 500
            };
        }
    }
};

module.exports = { customerService };
