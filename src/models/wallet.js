const mongoose = require('mongoose');

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
    created_at: {
        type: Date,
        default: Date.now
    }
});

const walletSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    document_id: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        default: 0
    },
    transactions: [transactionSchema],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

walletSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

walletSchema.index({ customer_id: 1 });
walletSchema.index({ document_id: 1 });
walletSchema.index({ phone: 1 });

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = { Wallet };
