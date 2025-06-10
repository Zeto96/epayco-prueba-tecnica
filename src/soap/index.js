const soap = require("soap");
const http = require("http");
const express = require("express");

const soapService = {
    EpaycoService: {
        EpaycoServiceSoap: {
            Saludar: function (args) {
                return {
                    saludo: `Hola, ${args.nombre || "mundo"}`
                };
            }
        }
    }
};

const xml = `<? xml version = "1.0" encoding = "UTF-8" ?>
    <definitions name="EpaycoService"
        targetNamespace="http://www.examples.com/epayco"
        xmlns="http://schemas.xmlsoap.org/wsdl/"
        xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
        xmlns:tns="http://www.examples.com/epayco"
        xmlns:xsd="http://www.w3.org/2001/XMLSchema">
        <message name="SaludarRequest">
            <part name="nombre" />
        </message>
        <message name="SaludarResponse">
            <part name="saludo" />
        </message>
        <portType name="EpaycoServiceSoap">
            <operation name="Saludar">
                <input message="tns:SaludarRequest" />
                <output message="tns:SaludarResponse" />
            </operation>
        </portType>
        <binding name="EpaycoServiceSoap" type="tns:EpaycoServiceSoap">
            <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http" />
            <operation name="Saludar">
                <soap:operation soapAction="urn:examples-epayco-com:EpaycoService#Saludar" />
                <input>
                    <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" />
                </input>
                <output>
                    <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" />
                </output>
            </operation>
        </binding>
        <service name="EpaycoService">
            <port name="EpaycoServiceSoap" binding="tns:EpaycoServiceSoap">
                <soap:address location="http://localhost:4000/epayco-service" />
            </port>
        </service>
    </definitions>`;

function startSoapServer(port) {
    const app = express();
    const server = http.createServer(app);

    soap.listen(server, "/epayco-service", soapService, xml);

    server.listen(port, () => {
        console.log(`Servidor SOAP corriendo en el puerto ${port}`);
    });

    return server;
};

module.exports = { startSoapServer };
