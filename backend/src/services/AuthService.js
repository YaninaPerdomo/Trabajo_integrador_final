import userRepository from '../repositories/UserRepository.js';
import { generateToken } from '../utils/jwtHelper.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

class AuthService {
    async register(userData) {
        const { email } = userData;
        
        // Verificar si el usuario ya existe
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('El usuario ya está registrado');
        }

        // Crear token de verificación
        const verificationToken = crypto.randomBytes(20).toString('hex');
        
        const user = await userRepository.create({
            ...userData,
            verificationToken
        });

        // Enviar correo de verificación
        const verifyUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
        const message = `Bienvenido a Event Planner. Por favor verifica tu cuenta haciendo clic en: \n\n ${verifyUrl}`;
        const html = `<h1>Bienvenido!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verifyUrl}">Verificar Cuenta</a>`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Verificación de cuenta - Event Planner',
                message,
                html
            });
        } catch (err) {
            console.error('Error enviando email:', err);
            // No bloqueamos el registro si falla el email en dev, pero en prod es crítico
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email
        };
    }

    async verifyEmail(token) {
        const user = await userRepository.findByVerificationToken(token);
        if (!user) {
            throw new Error('Token de verificación inválido');
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await userRepository.update(user);

        return true;
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            throw new Error('Credenciales inválidas');
        }

        if (!user.isVerified) {
            throw new Error('Por favor verifica tu correo electrónico para iniciar sesión');
        }

        const token = generateToken(user._id);

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        };
    }
}

export default new AuthService();
