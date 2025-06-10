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

module.exports = { validateResult, validateCreateCustomer };