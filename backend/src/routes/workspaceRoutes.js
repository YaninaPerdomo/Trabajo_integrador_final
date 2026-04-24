import express from 'express';
import workspaceController from '../controllers/WorkspaceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', workspaceController.createWorkspace);
router.get('/my', workspaceController.getMyWorkspaces);
router.get('/public', workspaceController.getPublicWorkspaces);
router.get('/pending', workspaceController.getPendingWorkspaces); // Para el admin
router.get('/:id', workspaceController.getWorkspace);
router.put('/:id', workspaceController.updateWorkspace);
router.delete('/:id', workspaceController.deleteWorkspace);
router.put('/:id/approve', workspaceController.approveWorkspace); // Para el admin
router.put('/:id/resources', workspaceController.updateResources);
router.put('/:id/channels', workspaceController.updateChannels);

// Gestión de miembros
router.post('/:id/members', workspaceController.addMember);
router.delete('/:id/members/:userId', workspaceController.removeMember);

export default router;
