const { startRestServer } = require("./src/rest");
const { startSoapServer } = require("./src/soap");
require("dotenv").config();

const PORT_REST = process.env.PORT_REST || 3000;
const PORT_SOAP = process.env.PORT_SOAP || 4000;

startRestServer(PORT_REST);
startSoapServer(PORT_SOAP);
