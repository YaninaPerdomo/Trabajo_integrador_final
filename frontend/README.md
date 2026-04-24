# Autismo Recursos - Frontend Web

Frontend del proyecto integrador final "Autismo Recursos". Es una aplicación web responsiva construida con React, Vite y Axios.

## Características
- **Autenticación completa:** Flujos de Login, Registro y Recuperación de contraseña (interfaz amigable con validación de formularios).
- **Diseño Moderno:** Tema oscuro con estilo neomorfismo (Glassmorphism), iconos interactivos y transiciones fluidas. Completamente adaptable a móviles (Responsive).
- **Gestión de Recursos:** Interfaz para crear, unirse, explorar y eliminar espacios de trabajo (Workspaces). Edición en línea de recursos.
- **Chat en tiempo real:** Comunicación entre miembros del mismo espacio.

## Instalación y Ejecución

1. Entrar a la carpeta `frontend` y descargar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno. Puedes crear un archivo `.env` en esta carpeta si tu backend no corre en el puerto 5000:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. Iniciar el servidor de desarrollo de Vite:
   ```bash
   npm run dev
   ```
   
4. Abrir en el navegador: `http://localhost:5173`.
