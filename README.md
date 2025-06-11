# Epayco API

Este proyecto implementa una plataforma de pagos electrónicos con servicios REST y SOAP, permitiendo gestionar clientes, billeteras electrónicas y transacciones.

## Características Principales

- **API REST**: Interfaz moderna para clientes web y móviles
- **Servicio SOAP**: Capa de servicios que contiene la lógica de negocio
- **Billetera Electrónica**: Soporte para recargas y pagos con confirmación por token
- **Validación por Token**: Sistema de seguridad para confirmación de pagos
- **Base de Datos MongoDB**: Almacenamiento de datos escalable y flexible

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express**: Framework para API REST
- **SOAP**: Implementación de servicios SOAP
- **MongoDB/Mongoose**: Base de datos y ODM
- **Nodemailer**: Envío de emails para confirmaciones
- **Express-validator**: Validación de datos
- **Crypto-JS**: Funciones criptográficas

## Requisitos Previos

- Node.js v14 o superior
- MongoDB instalado y en ejecución
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/Zeto96/epayco-prueba-tecnica.git
cd epayco-prueba-tecnica
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en la raíz del proyecto:

```
# Puertos
PORT_REST=3000
PORT_SOAP=4000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/epayco

```

## Inicialización

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación iniciará dos servidores:
- **REST API**: http://localhost:3000
- **SOAP Service**: http://localhost:4000/epayco-service

## Estructura del Proyecto

```
epayco/
├── src/
│   ├── config/           # Configuraciones generales
│   ├── models/           # Esquemas de datos para MongoDB
│   ├── rest/             # Implementación de la API REST
│   │   ├── controllers/  # Controladores REST
│   │   ├── middlewares/  # Middlewares (validación, etc.)
│   │   └── routes/       # Definición de rutas
│   ├── soap/             # Implementación del servicio SOAP
│   │   ├── services/     # Servicios SOAP
│   │   ├── validators/   # Validadores para SOAP
│   │   └── wsdl/         # Definiciones WSDL
│   └── utils/            # Utilidades (email, etc.)
├── server.js             # Punto de entrada principal
├── package.json          # Dependencias y scripts
└── .env                  # Variables de entorno
```

## Endpoints REST

### Clientes

- **POST /api/customers/create_customer**: Crear un nuevo cliente
  - Body: `{ names, last_names, email, document_id, phone }`

### Billetera

- **POST /api/wallet/wallet_recharge**: Recargar saldo
  - Body: `{ document_id, phone, amount }`
- **POST /api/wallet/wallet_balance**: Consultar saldo
  - Body: `{ document_id, phone }`
- **POST /api/wallet/wallet_payment**: Iniciar proceso de pago
  - Body: `{ document_id, phone, amount }`
- **POST /api/wallet/confirm_payment**: Confirmar pago con token
  - Body: `{ session_id, token }`

### Métodos disponibles:

- **create_customer**: Crear un nuevo cliente
- **wallet_recharge**: Recargar saldo
- **wallet_balance**: Consultar saldo
- **wallet_payment**: Iniciar proceso de pago
- **confirm_payment**: Confirmar pago con token

## Flujo de Pago

1. El cliente inicia un pago (`wallet_payment`)
2. El sistema verifica el saldo y genera un token de 6 dígitos
3. El token se envía al correo del cliente junto con un ID de sesión
4. El cliente confirma el pago enviando el ID de sesión y el token (`confirm_payment`)
5. El sistema verifica y procesa el pago

## Seguridad

- Validación de datos en todas las operaciones
- Tokens de un solo uso para confirmación de pagos
- Manejo de errores detallado
- Protección contra ataques comunes mediante middlewares
