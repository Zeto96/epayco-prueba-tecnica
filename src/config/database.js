const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/epayco";

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Conexión a MongoDB establecida");
        return mongoose.connection;
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};

module.exports = { connectDB };
