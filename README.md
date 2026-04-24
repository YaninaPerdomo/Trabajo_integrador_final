# Autismo Recursos - Plataforma Integral de Comunidad y Gestión

Este proyecto es el **Trabajo Integrador Final** de la carrera, consistente en una aplicación web full-stack diseñada para centralizar recursos, facilitar la comunicación y gestionar eventos relacionados con el Trastorno del Espectro Autista (TEA). La plataforma permite la interacción entre familias, profesionales y personas interesadas a través de espacios de trabajo colaborativos y canales temáticos.

## 🚀 Características Principales

- **Gestión de Workspaces y Canales**: Espacios organizados por temáticas (Diagnóstico, Educación, Terapias, etc.) con soporte para múltiples canales de discusión.
- **Sistema de Comunicación**: Chat integrado dentro de cada canal para el intercambio de experiencias y recursos.
- **Panel de Administración**: Gestión centralizada de usuarios y categorías para mantener la integridad de la comunidad.
- **Calendario de Eventos**: Seguimiento de actividades, talleres y seminarios relevantes.
- **Autenticación Robusta**:
    - Registro e Inicio de sesión con JWT.
    - Verificación de cuenta vía correo electrónico.
    - Recuperación de contraseña mediante tokens temporales.
- **Interfaz Moderna y Responsiva**: Diseño limpio enfocado en la usabilidad, construido con Vanilla CSS para máxima ligereza.

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js & Express**: Servidor robusto y escalable.
- **MongoDB & Mongoose**: Base de datos NoSQL con modelado de datos eficiente.
- **Seguridad**: `bcryptjs` para el cifrado de contraseñas y `jsonwebtoken` para la gestión de sesiones.
- **Comunicación**: `nodemailer` para el envío de correos transaccionales.

### Frontend
- **React (Vite)**: Biblioteca moderna para interfaces de usuario rápidas.
- **Context API**: Gestión de estado global para la autenticación.
- **Axios**: Cliente HTTP para el consumo de la API.
- **Lucide React**: Biblioteca de iconos minimalista.
- **Vanilla CSS**: Estilos personalizados sin dependencias externas pesadas.

## 📂 Estructura del Proyecto

```text
Trabajo_integrador_final/
├── backend/                # Lógica del servidor
│   ├── src/
│   │   ├── config/         # Conexión a Base de Datos
│   │   ├── controllers/    # Controladores de la API
│   │   ├── middleware/     # Middlewares de Auth y Validación
│   │   ├── models/         # Esquemas de Mongoose
│   │   ├── repositories/   # Abstracción de acceso a datos
│   │   ├── routes/         # Definición de Endpoints
│   │   ├── services/       # Lógica de negocio
│   │   └── utils/          # Helpers (JWT, Email)
└── frontend/               # Interfaz de usuario
    ├── src/
    │   ├── components/     # Componentes de UI reutilizables
    │   ├── context/        # Proveedores de contexto (Auth)
    │   ├── hooks/          # Hooks personalizados de lógica
    │   ├── pages/          # Vistas principales de la app
    │   └── services/       # Clientes de servicios API
```

## ⚙️ Configuración e Instalación

### Requisitos Previos
- **Node.js** (v18 o superior)
- **MongoDB** (Local o Atlas)

### 1. Clonar el repositorio
```bash
git clone https://github.com/YaninaPerdomo/Trabajo_integrador_final.git
cd Trabajo_integrador_final
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```
Crear un archivo `.env` en `backend/` con las siguientes variables:
```env
PORT=5000
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_secreto_super_seguro
EMAIL_USER=tu_correo_smtp
EMAIL_PASS=tu_password_smtp
FRONTEND_URL=http://localhost:5173
```
Iniciar servidor:
```bash
npm run dev
```

### 3. Configurar el Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## 📡 API Endpoints (Resumen)

### Autenticación (`/api/auth`)
- `POST /register`: Registro de usuario.
- `POST /login`: Inicio de sesión.
- `GET /verify/:token`: Verificación de email.
- `POST /forgot-password`: Solicitar recuperación.
- `POST /reset-password/:token`: Cambiar contraseña.

### Workspaces (`/api/workspaces`)
- `GET /`: Listar todos los espacios.
- `POST /`: Crear nuevo espacio (Admin).
- `GET /:id/channels`: Obtener canales de un espacio.

### Mensajes (`/api/messages`)
- `GET /channel/:channelId`: Obtener historial del canal.
- `POST /`: Enviar nuevo mensaje.

### Administración (`/api/admin`)
- `GET /users`: Listado de usuarios registrados.
- `DELETE /users/:id`: Eliminar usuario.

---
**Desarrollado por Yanina Perdomo**  
*Proyecto Integrador Final - 2026*
