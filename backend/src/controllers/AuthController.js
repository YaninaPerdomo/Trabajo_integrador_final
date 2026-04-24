import authService from '../services/AuthService.js';

class AuthController {
    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json({
                success: true,
                message: 'Usuario registrado. Por favor verifica tu correo.',
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async verifyEmail(req, res) {
        try {
            await authService.verifyEmail(req.params.token);
            res.status(200).json({
                success: true,
                message: 'Cuenta verificada exitosamente.'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async resendVerification(req, res) {
        try {
            const { email } = req.body;
            await authService.resendVerification(email);
            res.status(200).json({
                success: true,
                message: 'Correo de verificación reenviado exitosamente. Revisa tu bandeja de entrada o spam.'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await authService.login(email, password);
            res.status(200).json({
                success: true,
                message: 'Login exitoso',
                data
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            await authService.forgotPassword(email);
            res.status(200).json({
                success: true,
                message: 'Correo enviado. Revisa tu bandeja de entrada o spam.'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { password } = req.body;
            await authService.resetPassword(token, password);
            res.status(200).json({
                success: true,
                message: 'Contraseña actualizada exitosamente. Ya puedes iniciar sesión.'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getProfile(req, res) {
        try {
            const user = await authService.getUserById(req.user.id);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async sendInvite(req, res) {
        try {
            const { email } = req.body;
            // No esperamos a que se envíe el correo para responder al usuario
            authService.sendInvite(email).catch(err => console.error('Error enviando invitación:', err));
            
            res.status(200).json({
                success: true,
                message: 'Invitación en proceso de envío'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new AuthController();
