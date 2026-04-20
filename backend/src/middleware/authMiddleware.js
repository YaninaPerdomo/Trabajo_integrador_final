import jwt from 'jsonwebtoken';
import userRepository from '../repositories/UserRepository.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token del header
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Obtener el usuario del token
            req.user = await userRepository.findById(decoded.id);

            if (!req.user) {
                return res.status(401).json({ success: false, message: 'No autorizado, usuario no encontrado' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'No autorizado, sin token' });
    }
};
