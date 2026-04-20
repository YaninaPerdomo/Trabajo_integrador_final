import express from 'express';
import eventController from '../controllers/EventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate, eventValidationRules } from '../middleware/validator.js';

const router = express.Router();

router.use(protect);

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', eventValidationRules(), validate, eventController.createEvent);
router.put('/:id', eventValidationRules(), validate, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;
