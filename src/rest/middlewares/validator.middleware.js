const { body, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message_error: "Error de validación",
            cod_error: 400,
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }

    next();
};

const validateCreateCustomer = [
    body('names')
        .trim()
        .notEmpty().withMessage("El nombre es requerido")
        .isLength({ min: 3, max: 50 }).withMessage("El nombre debe tener al menos 3 caracteres y máximo 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El nombre solo puede contener letras y espacios"),

    body('last_names')
        .trim()
        .notEmpty().withMessage("El apellido es requerido")
        .isLength({ min: 3, max: 50 }).withMessage("El apellido debe tener al menos 3 caracteres y máximo 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El apellido solo puede contener letras y espacios"),

    body('email')
        .trim()
        .notEmpty().withMessage("El email es requerido")
        .isEmail().withMessage("El email no es válido")
        .normalizeEmail(),

    body('document_id')
        .trim()
        .notEmpty().withMessage("El documento es requerido")
        .isLength({ min: 5, max: 20 }).withMessage("El documento debe tener al menos 5 caracteres y máximo 20 caracteres")
        .escape(),

    body('phone')
        .trim()
        .notEmpty().withMessage("El teléfono es requerido")
        .matches(/^\+?[0-9]{8,15}$/).withMessage('Formato de teléfono inválido')
];

const validateWalletRecharge = [
    body('document_id')
        .trim()
        .notEmpty().withMessage("El numero documento es requerido")
        .isLength({ min: 5, max: 20 }).withMessage("El numero documento debe tener al menos 5 caracteres y máximo 20 caracteres")
        .escape(),

    body('phone')
        .trim()
        .notEmpty().withMessage("El numero de teléfono es requerido")
        .matches(/^\+?[0-9]{8,15}$/).withMessage('Formato de teléfono inválido'),

    body('amount')
        .trim()
        .notEmpty().withMessage("El monto es requerido")
        .isNumeric().withMessage("El monto debe ser un valor numérico")
        .isFloat({ min: 5 }).withMessage("El monto debe ser mayor a 5")
        .isFloat({ max: 1000000 }).withMessage("El monto debe ser menor a 1000000"),
];

const validateWalletBalance = [
    body('document_id')
        .trim()
        .notEmpty().withMessage("El numero documento es requerido")
        .isLength({ min: 5, max: 20 }).withMessage("El numero documento debe tener al menos 5 caracteres y máximo 20 caracteres")
        .escape(),

    body('phone')
        .trim()
        .notEmpty().withMessage("El numero de teléfono es requerido")
        .matches(/^\+?[0-9]{8,15}$/).withMessage('Formato de teléfono inválido')
];

const validateWalletPayment = [
    body('document_id')
        .trim()
        .notEmpty().withMessage("El numero documento es requerido")
        .isNumeric().withMessage("El numero documento debe ser un valor numérico")
        .escape(),

    body('phone')
        .trim()
        .notEmpty().withMessage("El numero de teléfono es requerido")
        .matches(/^\+?[0-9]{8,15}$/).withMessage('Formato de teléfono inválido'),

    body('amount')
        .trim()
        .notEmpty().withMessage("El monto es requerido")
        .isNumeric().withMessage("El monto debe ser un valor numérico")
        .isFloat({ gt: 0 }).withMessage("El monto debe ser mayor a 0")
];

const validatePaymentConfirmation = [
    body('session_id')
        .trim()
        .notEmpty().withMessage("El ID de sesión es requerido")
        .isLength({ min: 32, max: 32 }).withMessage("El ID de sesión debe tener 32 caracteres")
        .matches(/^[0-9a-f]{32}$/).withMessage("Formato de ID de sesión inválido"),

    body('token')
        .trim()
        .notEmpty().withMessage("El token es requerido")
        .isLength({ min: 6, max: 6 }).withMessage("El token debe tener 6 dígitos")
        .isNumeric().withMessage("El token debe ser un número"),
];

module.exports = {
    validateResult,
    validateCreateCustomer,
    validateWalletRecharge,
    validateWalletBalance,
    validateWalletPayment,
    validatePaymentConfirmation
};
