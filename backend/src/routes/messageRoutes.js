import express from 'express';
import messageController from '../controllers/MessageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', messageController.sendMessage);
router.get('/:workspaceId', messageController.getMessages);

export default router;
