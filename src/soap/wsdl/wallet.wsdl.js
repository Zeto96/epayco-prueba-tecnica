const walletWSDL = `
    <message name="wallet_rechargeRequest">
        <part name="document_id" type="xsd:string"/>
        <part name="phone" type="xsd:string"/>
        <part name="amount" type="xsd:string"/>
    </message>
    <message name="wallet_rechargeResponse">
        <part name="success" type="xsd:boolean"/>
        <part name="message_success" type="xsd:string"/>
        <part name="message_error" type="xsd:string"/>
        <part name="cod_success" type="xsd:int"/>
        <part name="cod_error" type="xsd:int"/>
        <part name="data" type="tns:WalletRechargeDataType"/>
    </message>
    
    <message name="wallet_balanceRequest">
        <part name="document_id" type="xsd:string"/>
        <part name="phone" type="xsd:string"/>
    </message>
    <message name="wallet_balanceResponse">
        <part name="success" type="xsd:boolean"/>
        <part name="message_success" type="xsd:string"/>
        <part name="message_error" type="xsd:string"/>
        <part name="cod_success" type="xsd:int"/>
        <part name="cod_error" type="xsd:int"/>
        <part name="data" type="tns:WalletBalanceDataType"/>
    </message>
        <message name="wallet_paymentRequest">
        <part name="document_id" type="xsd:string"/>
        <part name="phone" type="xsd:string"/>
        <part name="amount" type="xsd:string"/>
    </message>
    <message name="wallet_paymentResponse">
        <part name="success" type="xsd:boolean"/>
        <part name="message_success" type="xsd:string"/>
        <part name="message_error" type="xsd:string"/>
        <part name="cod_success" type="xsd:int"/>
        <part name="cod_error" type="xsd:int"/>
        <part name="data" type="tns:WalletPaymentDataType"/>
    </message>
    <message name="confirm_paymentRequest">
        <part name="session_id" type="xsd:string"/>
        <part name="token" type="xsd:string"/>
    </message>
    <message name="confirm_paymentResponse">
        <part name="success" type="xsd:boolean"/>
        <part name="message_success" type="xsd:string"/>
        <part name="message_error" type="xsd:string"/>
        <part name="cod_success" type="xsd:int"/>
        <part name="cod_error" type="xsd:int"/>
        <part name="data" type="tns:PaymentConfirmationDataType"/>
    </message>
`;

const walletPortType = `
    <operation name="wallet_recharge">
        <input message="tns:wallet_rechargeRequest"/>
        <output message="tns:wallet_rechargeResponse"/>
    </operation>
    <operation name="wallet_balance">
        <input message="tns:wallet_balanceRequest"/>
        <output message="tns:wallet_balanceResponse"/>
    </operation>
        <operation name="wallet_payment">
        <input message="tns:wallet_paymentRequest"/>
        <output message="tns:wallet_paymentResponse"/>
    </operation>
    <operation name="confirm_payment">
        <input message="tns:confirm_paymentRequest"/>
        <output message="tns:confirm_paymentResponse"/>
    </operation>
`;

const walletBinding = `
    <operation name="wallet_recharge">
        <soap:operation soapAction="urn:examples-epayco-com:EpaycoService#wallet_recharge"/>
        <input>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </input>
        <output>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </output>
    </operation>
    <operation name="wallet_balance">
        <soap:operation soapAction="urn:examples-epayco-com:EpaycoService#wallet_balance"/>
        <input>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </input>
        <output>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </output>
    </operation>
    <operation name="wallet_payment">
        <soap:operation soapAction="urn:examples-epayco-com:EpaycoService#wallet_payment"/>
        <input>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </input>
        <output>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </output>
    </operation>
    <operation name="confirm_payment">
        <soap:operation soapAction="urn:examples-epayco-com:EpaycoService#confirm_payment"/>
        <input>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </input>
        <output>
            <soap:body use="encoded" namespace="urn:examples-epayco-com:EpaycoService" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
        </output>
    </operation>
`;

const walletTypes = `
    <complexType name="WalletRechargeDataType">
        <sequence>
            <element name="document_id" type="xsd:string"/>
            <element name="phone" type="xsd:string"/>
            <element name="amount" type="xsd:string"/>
        </sequence>
    </complexType>
    <complexType name="WalletBalanceDataType">
        <sequence>
            <element name="document_id" type="xsd:string"/>
            <element name="phone" type="xsd:string"/>
        </sequence>
    </complexType>
    <complexType name="WalletPaymentDataType">
        <sequence>
            <element name="session_id" type="xsd:string"/>
            <element name="expires_at" type="xsd:dateTime"/>
            <element name="email" type="xsd:string"/>
        </sequence>
    </complexType>
    <complexType name="PaymentConfirmationDataType">
        <sequence>
            <element name="amount" type="xsd:float"/>
            <element name="balance" type="xsd:float"/>
            <element name="transaction_id" type="xsd:string"/>
            <element name="date" type="xsd:dateTime"/>
        </sequence>
    </complexType>
`;

module.exports = {
    walletWSDL,
    walletPortType,
    walletBinding,
    walletTypes
};