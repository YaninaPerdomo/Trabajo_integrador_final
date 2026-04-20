# Sistema de Gestión de Eventos (Full-Stack)

Este es el proyecto integrador final que consiste en una aplicación de gestión de eventos con arquitectura en capas, autenticación segura y una interfaz moderna.

## Tecnologías Utilizadas
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Frontend**: React (Vite), Axios, Lucide React (iconos), Vanilla CSS.
- **Seguridad**: JWT (JSON Web Tokens), bcryptjs para hashing de contraseñas.
- **Email**: Nodemailer para verificación de cuentas.

## Estructura del Proyecto
```
final-project/
├── backend/           # Lógica del servidor y API
│   ├── src/
│   │   ├── config/    # Configuración de DB
│   │   ├── models/    # Modelos de Mongoose
│   │   ├── repositories/ # Capa de acceso a datos
│   │   ├── services/  # Capa de lógica de negocio
│   │   ├── controllers/ # Capa de controladores
│   │   ├── routes/    # Definición de rutas
│   │   ├── middleware/# Middlewares (Auth, Validaciones)
│   │   └── utils/     # Helpers (JWT, Email)
└── frontend/          # Interfaz de usuario (React)
    ├── src/
    │   ├── components/ # Componentes reutilizables
    │   ├── context/    # Estado global (Auth)
    │   ├── pages/      # Páginas de la aplicación
    │   └── services/   # Cliente API (Axios)
```

## Configuración e Instalación

### Requisitos Previos
- Node.js (v18+)
- MongoDB corriendo localmente o una URI de MongoDB Atlas.

### Pasos para el Backend
1. Ir a la carpeta `backend`: `cd backend`
2. Instalar dependencias: `npm install`
3. Configurar el archivo `.env` (se incluye un ejemplo):
   ```env
   PORT=5000
   MONGODB_URI=tu_uri_de_mongodb
   JWT_SECRET=secreto_seguro
   EMAIL_USER=tu_usuario_smtp
   EMAIL_PASS=tu_password_smtp
   ```
4. Iniciar en modo desarrollo: `npm run dev`

### Pasos para el Frontend
1. Ir a la carpeta `frontend`: `cd frontend`
2. Instalar dependencias: `npm install`
3. Iniciar la aplicación: `npm run dev`

## Documentación de la API (Endpoints)

### Autenticación
- `POST /api/auth/register`: Registro de nuevo usuario.
- `GET /api/auth/verify/:token`: Verificación de cuenta vía token de email.
- `POST /api/auth/login`: Inicio de sesión (devuelve JWT).

### Categorías (Protegidas)
- `GET /api/categories`: Listar categorías del usuario.
- `POST /api/categories`: Crear nueva categoría.
- `PUT /api/categories/:id`: Editar categoría.
- `DELETE /api/categories/:id`: Eliminar categoría.

### Eventos (Protegidas)
- `GET /api/events`: Listar eventos del usuario.
- `POST /api/events`: Crear nuevo evento.
- `PUT /api/events/:id`: Editar evento.
- `DELETE /api/events/:id`: Eliminar evento.

## Usuarios de Prueba
- **Email**: (Debe registrarse primero y verificar vía email para activar).
- **Nota**: El sistema utiliza **Ethereal Email** o **Mailtrap** por defecto para las pruebas de envío de correos.
