import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Configuración de variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// ✅ CORS manual - garantiza que los headers siempre se envíen
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    // Responder inmediatamente a las peticiones preflight OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    next();
});

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'API de Gestión de Workspaces Funcionando' });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);

// Manejo de errores centralizado
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

const PORT = process.env.PORT || 5000;

// Solo escuchar si no estamos en Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}

export default app;
