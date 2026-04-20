import express from 'express';
import authController from '../controllers/AuthController.js';
import { validate, registerValidationRules } from '../middleware/validator.js';

const router = express.Router();

router.post('/register', registerValidationRules(), validate, authController.register);
router.get('/verify/:token', authController.verifyEmail);
router.post('/login', authController.login);

export default router;
