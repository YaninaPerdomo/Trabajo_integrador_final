import express from 'express';
import authController from '../controllers/AuthController.js';
import { validate, registerValidationRules } from '../middleware/validator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerValidationRules(), validate, authController.register);
router.get('/verify/:token', authController.verifyEmail);
router.post('/resend-verification', authController.resendVerification);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/profile', protect, authController.getProfile);
router.post('/invite', protect, authController.sendInvite);

export default router;
