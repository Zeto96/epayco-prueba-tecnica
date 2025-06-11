const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['recharge', 'payment', 'transfer'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: String,
    reference: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

const pendingPaymentSchema = new mongoose.Schema({
    session_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

const walletSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        index: true
    },
    document_id: {
        type: Number,
        required: true,
        index: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    balance: {
        type: Number,
        default: 0
    },
    transactions: [transactionSchema],
    pending_payments: [pendingPaymentSchema],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

walletSchema.methods.generatePaymentToken = function (amount) {
    const randomWords = CryptoJS.lib.WordArray.random(16);
    const session_id = randomWords.toString(CryptoJS.enc.Hex);

    const token = Math.floor(100000 + Math.random() * 900000).toString();

    this.pending_payments.push({
        session_id,
        token,
        amount,
        description: "Pago pendiente"
    });

    return {
        session_id,
        token,
    }
};

walletSchema.methods.validatePaymentToken = function (session_id, token) {
    const pendingPayment = this.pending_payments.find(payment => payment.session_id === session_id);

    if (!pendingPayment) {
        return {
            success: false,
            message_error: "Token de pago no encontrado",
            cod_error: 400
        };
    }

    if (pendingPayment.token !== token) {
        return {
            success: false,
            message_error: "Token de pago incorrecto",
            cod_error: 400
        };
    }

    return {
        success: true,
        message_success: "Token de pago validado correctamente",
        cod_error: 0o0,
        data: pendingPayment
    }
};

walletSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = { Wallet };
