# Autismo Recursos - Backend API

Esta es la API del proyecto integrador final "Autismo Recursos". Está construida con Node.js, Express y MongoDB.

## Arquitectura
La aplicación sigue una arquitectura en capas (Layered Architecture):
- **routes/**: Define los endpoints de la API y aplica middlewares (como validación y protección JWT).
- **controllers/**: Maneja los objetos `req` y `res`, extrayendo la información y delegando el procesamiento.
- **services/**: Contiene toda la lógica de negocio pura.
- **repositories/**: Capa de acceso a datos que interactúa directamente con la base de datos (Mongoose).

## Requisitos Previos
- Node.js (v18+)
- Instancia de MongoDB (Atlas o Local)

## Instalación y Ejecución

1. Entrar a la carpeta e instalar dependencias:
   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raíz de `backend` basándote en las siguientes variables:
   ```env
   PORT=5000
   MONGODB_URI=tu_string_de_conexion_mongo
   JWT_SECRET=una_clave_secreta_muy_segura
   EMAIL_USER=tu_email_para_nodemailer@gmail.com
   EMAIL_PASS=tu_app_password_generada
   FRONTEND_URL=http://localhost:5173
   ```

3. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

## Endpoints Principales

### Autenticación (`/api/auth`)
- `POST /register`: Registra un nuevo usuario y envía email de verificación.
- `POST /verify`: Verifica la cuenta usando el token del email.
- `POST /login`: Autentica al usuario y devuelve el token JWT.
- `POST /forgot-password` y `POST /reset-password/:token`: Flujo de recuperación.

### Espacios de Trabajo (`/api/workspaces`) - *Protegidas por JWT*
- `GET /public`: Lista espacios públicos aprobados.
- `GET /my`: Lista los espacios donde soy dueño o miembro.
- `POST /`: Crea un nuevo espacio.
- `PUT /:id`: Actualiza descripción/datos generales.
- `DELETE /:id`: Elimina el espacio completo (solo admin/propietario).
- `PUT /:id/resources`: Actualiza la lista de recursos del espacio.
- `POST /:id/members`: Añade un usuario por email al espacio.

### Mensajería (`/api/messages`)
- `GET /:workspaceId`: Obtiene los mensajes del chat del espacio.
- `POST /`: Envía un nuevo mensaje al chat.

*(Nota: En la carpeta raíz del proyecto se adjunta una colección de Postman completa para importar y probar todas las rutas).*
