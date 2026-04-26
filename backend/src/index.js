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

const cors =require('cors');

// Middlewares globales - CORS permisivo para permitir el frontend
app.use(cors({
    origin: 'https://trabajo-integrador-final-9ve4-front.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // Manejo explícito de preflight
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

// Manejo de errores centralizado (placeholder)
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
