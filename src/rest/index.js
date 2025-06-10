/* Librerias */
const rateLimit = require("express-rate-limit");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");   

/* Rutas */
const usersRoutes = require("./routes/users/users.routes");

/* Paquete */
const pkg = require("../../package.json");

function startRestServer(port) {
    const app = express();
    app.use(helmet());

    /* CORS */
    app.use(cors({
        origin: process.env.CORS_ORIGIN || "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

    /* Limite de peticiones */
    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Demasiadas solicitudes, intente nuevamente más tarde"
    });
    app.use("/api", apiLimiter);

    /* Middlewares */
    app.use(morgan("dev"));
    app.use(express.json({ limit: "10kb" }));
    app.use(express.urlencoded({ extended: true, limit: "10kb" }));


    app.get("/", (req, res) => {
        res.json({
            name: pkg.name,
            version: pkg.version,
            description: pkg.description
        });
    });

    /* Rutas */
    app.use("/api/customers", usersRoutes);

    /* Ruta no encontrada */
    app.use((req, res, next) => {
        res.status(404).json({
            success: false,
            message_error: "Ruta no encontrada",
            cod_error: 404,
            path: req.originalUrl
        });
    });

    /* Manejo de errores */
    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).json({
            success: false,
            message_error: err.message,
            cod_error: err.statusCode || 500,
        });
    });

    const server = app.listen(port, () => {
        console.log(`Servidor REST corriendo en el puerto ${port}`);
    });

    return server;
};

module.exports = { startRestServer };
