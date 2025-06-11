const { startRestServer } = require("./src/rest");
const { startSoapServer } = require("./src/soap");
require("dotenv").config();

const PORT_REST = process.env.PORT_REST || 3000;
const PORT_SOAP = process.env.PORT_SOAP || 4000;

async function main() {
    try {
        await startSoapServer(PORT_SOAP);

        await new Promise(resolve => setTimeout(resolve, 1000));

        startRestServer(PORT_REST);
    } catch (error) {
        console.error("Error al iniciar los servidores:", error);
        process.exit(1);
    }
};

main();
