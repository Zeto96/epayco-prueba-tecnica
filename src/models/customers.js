const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
        trim: true
    },
    last_names: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    document_id: {
        type: Number,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer };