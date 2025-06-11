const soap = require("soap");
const http = require("http");
const express = require("express");
const { customerService } = require("./services/customers/customer.service");
const { walletService } = require("./services/wallet/wallet.service");
const { getFullWsdl } = require("./wsdl");
const { connectDB } = require("../config/database");
require("dotenv").config();

async function startSoapServer(port) {
    try {
        /* Conexión a MongoDB */
        await connectDB();

        const app = express();

        /* CORS */
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        const server = http.createServer(app);

        /* Services */
        const soapService = {
            EpaycoService: {
                EpaycoServiceSoap: {
                    ...customerService,
                    ...walletService
                }
            }
        };

        /* WSDL */
        const xml = getFullWsdl();

        soap.listen(server, "/epayco-service", soapService, xml);

        server.listen(port, () => {
            console.log(`Servidor SOAP corriendo en el puerto ${port}`);
            console.log(`WSDL disponible en: http://localhost:${port}/epayco-service?wsdl`);
        });

        return server;
    } catch (error) {
        console.error("Error al iniciar el servidor SOAP:", error);
        process.exit(1);
    }
};

module.exports = { startSoapServer };
