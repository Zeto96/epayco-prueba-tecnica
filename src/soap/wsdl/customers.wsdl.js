const customersWSDL = `
    <message name="create_customerRequest">
        <part name="names" type="xsd:string"/>
        <part name="last_names" type="xsd:string"/>
        <part name="email" type="xsd:string"/>
        <part name="document_id" type="xsd:string"/>
        <part name="phone" type="xsd:string"/>
    </message>
    <message name="create_customerResponse">
        <part name="success" type="xsd:boolean"/>
        <part name="message_success" type="xsd:string"/>
        <part name="message_error" type="xsd:string"/>
        <part name="cod_success" type="xsd:int"/>
        <part name="cod_error" type="xsd:int"/>
        <part name="data" type="tns:CustomerDataType"/>
    </message>
`;

const customersPortType = `
    <operation name="create_customer">
        <input message="tns:create_customerRequest"/>
        <output message="tns:create_customerResponse"/>
    </operation>
`;

const customersBinding = `
    <operation name="create_customer">
        <soap:operation soapAction="urn:examples-epayco-com:EpaycoService#create_customer"/>
        <input>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </input>
        <output>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </output>
    </operation>
`;

const customersTypes = `
    <complexType name="CustomerDataType">
        <sequence>
            <element name="names"/>
            <element name="last_names"/>
            <element name="email"/>
            <element name="document_id"/>
            <element name="phone"/>
        </sequence>
    </complexType>
`;

module.exports = {
    customersWSDL,
    customersPortType,
    customersBinding,
    customersTypes
};