const soap = require("soap");
const util = require("util");

const SOAP_URL = process.env.SOAP_URL || 'http://localhost:4000/epayco-service?wsdl';

class SoapClient {
    constructor() {
        this.client = null;
        this.initialized = false;
    }

    async initialize() {
        if (!this.initialized) {
            try {
                this.client = await util.promisify(soap.createClient)(SOAP_URL);
                this.initialized = true;
                console.log("Cliente SOAP inicializado correctamente");
            } catch (error) {
                console.error("Error al inicializar el cliente SOAP:", error);
                throw new Error("No se pudo conectar al servicio SOAP");
            }
        }

        return this.client;
    }

    async callSoapMethod(methodName, args) {
        try {
            const client = await this.initialize();

            const callMethod = util.promisify(client[methodName].bind(client));

            const result = await callMethod(args);
            return result;
        } catch (error) {
            console.error(`Error al llamar al método ${methodName}:`, error);
            throw error;
        }
    }
};

const soapClient = new SoapClient();

module.exports = soapClient;