function validateCustomerData(data) {
    const errors = [];

    if (!data.names) {
        errors.push("El nombre es requerido");
    } else if (data.names.length < 3 || data.names.length > 50) {
        errors.push("El nombre debe tener entre 3 y 50 caracteres");
    }

    if (!data.last_names) {
        errors.push("Los apellidos son requeridos");
    } else if (data.last_names.length < 3 || data.last_names.length > 50) {
        errors.push("Los apellidos deben tener entre 3 y 50 caracteres");
    }

    if (!data.email) {
        errors.push("El email es requerido");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.push("El formato de email es inválido");
        }
    }

    if (!data.document_id) {
        errors.push("El documento es requerido");
    } else if (data.document_id.length < 5 || data.document_id.length > 20) {
        errors.push("El documento debe tener entre 5 y 20 caracteres");
    }

    if (!data.phone) {
        errors.push("El teléfono es requerido");
    } else {
        const phoneRegex = /^\+?[0-9]{8,15}$/;
        if (!phoneRegex.test(data.phone)) {
            errors.push("El formato de teléfono es inválido");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

function validateWalletRechargeData(data) {
    const errors = [];

    if (!data.document_id) {
        errors.push("El documento es requerido");
    } else if (data.document_id.length < 5 || data.document_id.length > 20) {
        errors.push("El documento debe tener entre 5 y 20 caracteres");
    }

    if (!data.phone) {
        errors.push("El teléfono es requerido");
    } else {
        const phoneRegex = /^\+?[0-9]{8,15}$/;
        if (!phoneRegex.test(data.phone)) {
            errors.push("El formato de teléfono es inválido");
        }
    }

    if (!data.amount) {
        errors.push("El monto es requerido");
    } else {
        const amount = parseFloat(data.amount);
        if (isNaN(amount)) {
            errors.push("El monto debe ser un valor numérico");
        } else if (amount < 5) {
            errors.push("El monto mínimo de recarga es de 5");
        } else if (amount > 1000000) {
            errors.push("El monto máximo de recarga es de 1,000,000");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

function validateWalletBalanceData(data) {
    const errors = [];

    if (!data.document_id) {
        errors.push("El documento es requerido");
    } else if (data.document_id.length < 5 || data.document_id.length > 20) {
        errors.push("El documento debe tener entre 5 y 20 caracteres");
    }

    if (!data.phone) {
        errors.push("El teléfono es requerido");
    } else {
        const phoneRegex = /^\+?[0-9]{8,15}$/;
        if (!phoneRegex.test(data.phone)) {
            errors.push("El formato de teléfono es inválido");
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = {
    validateCustomerData,
    validateWalletRechargeData,
    validateWalletBalanceData
};