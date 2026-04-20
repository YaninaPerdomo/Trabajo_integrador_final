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
}

export default new AuthController();
