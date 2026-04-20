import { validationResult, body } from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        success: false,
        message: 'Error de validación de entrada',
        errors: extractedErrors,
    });
};

export const registerValidationRules = () => {
    return [
        body('name').notEmpty().withMessage('El nombre es obligatorio'),
        body('email').isEmail().withMessage('Email no válido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    ];
};

export const eventValidationRules = () => {
    return [
        body('title').notEmpty().withMessage('El título es obligatorio'),
        body('date').isISO8601().withMessage('Fecha no válida'),
        body('location').notEmpty().withMessage('La ubicación es obligatoria'),
        body('category').isMongoId().withMessage('ID de categoría no válido'),
    ];
};
