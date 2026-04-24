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
        const message = `Bienvenido a Autismo Recursos. Por favor verifica tu cuenta haciendo clic en: \n\n ${verifyUrl}`;
        const html = `<h1>Bienvenido!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verifyUrl}">Verificar Cuenta</a>`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Verificación de cuenta - Autismo Recursos',
                message,
                html
            });
        } catch (err) {
            console.error('Error enviando email:', err);
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

    async resendVerification(email) {
        const user = await userRepository.findByEmail(email);
        
        if (!user) {
            throw new Error('No existe un usuario con ese correo electrónico');
        }

        if (user.isVerified) {
            throw new Error('El usuario ya está verificado');
        }

        const verificationToken = crypto.randomBytes(20).toString('hex');
        user.verificationToken = verificationToken;
        await userRepository.update(user);

        const verifyUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
        const message = `Bienvenido a Autismo Recursos. Por favor verifica tu cuenta haciendo clic en: \n\n ${verifyUrl}`;
        const html = `<h1>Bienvenido!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verifyUrl}">Verificar Cuenta</a>`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Verificación de cuenta - Autismo Recursos',
                message,
                html
            });
            return true;
        } catch (err) {
            console.error('Error enviando email:', err);
            throw new Error(`Error al enviar correo: ${err.message}`);
        }
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
                email: user.email,
                isAdmin: user.isAdmin
            }
        };
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) throw new Error('Usuario no encontrado');
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        };
    }

    async forgotPassword(email) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('No existe una cuenta con este correo.');
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        
        await userRepository.update(user);

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const message = `Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:\n\n${resetUrl}`;
        const html = `<h1>Restablecer Contraseña</h1><p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p><a href="${resetUrl}">Cambiar Contraseña</a>`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Restablecer contraseña - Autismo Recursos',
                message,
                html
            });
            return true;
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await userRepository.update(user);
            console.error('Error enviando email de reseteo:', err);
            throw new Error('No se pudo enviar el correo de recuperación');
        }
    }

    async resetPassword(resetToken, newPassword) {
        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const user = await userRepository.findByResetPasswordToken(resetPasswordToken);
        
        if (!user) {
            throw new Error('Token inválido o expirado');
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await userRepository.update(user);
        
        return true;
    }

    async sendInvite(email) {
        const invitationLink = `${process.env.FRONTEND_URL}/register`;
        await sendEmail({
            email: email,
            subject: 'Invitación a Autismo Recursos',
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #6366f1;">¡Has sido invitado!</h2>
                    <p>Te han invitado a unirte a <strong>Autismo Recursos</strong>, una plataforma comunitaria de apoyo e información.</p>
                    <p>Haz clic en el siguiente enlace para registrarte y acceder a la plataforma:</p>
                    <a href="${invitationLink}" style="display: inline-block; padding: 10px 20px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">Unirse a la Comunidad</a>
                    <p style="margin-top: 20px; font-size: 0.8rem; color: #777;">Si no esperabas esta invitación, puedes ignorar este correo.</p>
                </div>
            `
        });
    }
}

export default new AuthService();
