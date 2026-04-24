import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Acceso denegado. Se requiere ser administrador del sitio.' });
    }
};

router.use(protect);
router.use(adminOnly);

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Cambiar rol de usuario
router.put('/users/:id/role', async (req, res) => {
    try {
        const { isAdmin } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { isAdmin }, { new: true });
        res.status(200).json({ success: true, message: 'Rol actualizado', data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Crear usuario directamente
router.post('/users', async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'El usuario ya existe' });

        const user = await User.create({
            name,
            email,
            password, // El modelo debería hashear esto automáticamente
            isAdmin,
            isVerified: true // Marcamos como verificado ya que lo crea el admin
        });

        res.status(201).json({ success: true, message: 'Usuario creado con éxito', data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;
