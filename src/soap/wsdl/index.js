const { customersWSDL, customersPortType, customersBinding, customersTypes } = require("./customers.wsdl");
const { walletWSDL, walletPortType, walletBinding, walletTypes } = require("./wallet.wsdl");

function getFullWsdl() {
    return `<?xml version = "1.0" encoding = "UTF-8" ?>
        <definitions name="EpaycoService"
            targetNamespace="http://www.examples.com/epayco"
            xmlns="http://schemas.xmlsoap.org/wsdl/"
            xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
            xmlns:tns="http://www.examples.com/epayco"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema">

            <types>
                <schema targetNamespace="http://www.examples.com/epayco"
                    xmlns="http://www.w3.org/2001/XMLSchema">
                    ${customersTypes}
                    ${walletTypes}
                </schema>
            </types>

            <!-- Mensajes -->
            ${customersWSDL}
            ${walletWSDL}

            <!-- PortType -->
            <portType name="EpaycoServiceSoap">
                ${customersPortType}
                ${walletPortType}
            </portType>

            <!-- Binding -->
            <binding name="EpaycoServiceSoap" type="tns:EpaycoServiceSoap">
                <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http" />
                ${customersBinding}
                ${walletBinding}
            </binding>

            <!-- Service -->
            <service name="EpaycoService">
                <port name="EpaycoServiceSoap" binding="tns:EpaycoServiceSoap">
                    <soap:address location="http://localhost:4000/epayco-service" />
                </port>
            </service>
        </definitions>`;
}

module.exports = { getFullWsdl };