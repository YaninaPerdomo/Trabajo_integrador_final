import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Workspace from './models/Workspace.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado para seeding...');

        // Limpiar para asegurar que no haya duplicados con pass sin hashear
        await User.deleteMany({ email: 'yanyperdomo@gmail.com' });

        const admin = await User.create({
            name: 'Admin',
            email: 'yanyperdomo@gmail.com',
            password: 'password123',
            isAdmin: true,
            isVerified: true
        });
        console.log('Admin creado correctamente (Hashed)');

        const topics = [
            'Interés General', 
            'Experiencias', 
            'Tratamientos Reconocidos', 
            'Debates y Apoyo'
        ];

        for (const t of topics) {
            const exists = await Workspace.findOne({ name: t });
            if (!exists) {
                await Workspace.create({
                    name: t,
                    topic: t,
                    visibility: 'público',
                    isApproved: true,
                    createdBy: admin._id,
                    members: [{ user: admin._id, role: 'propietario' }]
                });
            }
        }
        console.log('Workspaces creados');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
