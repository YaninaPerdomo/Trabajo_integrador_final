import workspaceService from '../services/WorkspaceService.js';

class WorkspaceController {
    async createWorkspace(req, res) {
        try {
            const workspace = await workspaceService.createWorkspace(req.body, req.user);
            res.status(201).json({
                success: true,
                message: 'Workspace enviado para aprobación',
                data: workspace
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getMyWorkspaces(req, res) {
        try {
            const workspaces = await workspaceService.getMyWorkspaces(req.user.id);
            res.status(200).json({ success: true, data: workspaces });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getPublicWorkspaces(req, res) {
        try {
            const workspaces = await workspaceService.getPublicWorkspaces();
            res.status(200).json({ success: true, data: workspaces });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getWorkspace(req, res) {
        try {
            const workspace = await workspaceService.getWorkspaceById(req.params.id, req.user);
            res.status(200).json({ success: true, data: workspace });
        } catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    }

    async approveWorkspace(req, res) {
        try {
            const workspace = await workspaceService.approveWorkspace(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Workspace aprobado con éxito',
                data: workspace
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getPendingWorkspaces(req, res) {
        try {
            const workspaces = await workspaceService.getPendingWorkspaces();
            res.status(200).json({ success: true, data: workspaces });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateResources(req, res) {
        try {
            const workspace = await workspaceService.updateResources(req.params.id, req.body.resources, req.user);
            res.status(200).json({
                success: true,
                message: 'Recursos actualizados con éxito',
                data: workspace
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async updateChannels(req, res) {
        try {
            const workspace = await workspaceService.updateChannels(req.params.id, req.body.channels, req.user);
            res.status(200).json({
                success: true,
                message: 'Canales actualizados con éxito',
                data: workspace
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async updateWorkspace(req, res) {
        try {
            const workspace = await workspaceService.updateWorkspace(req.params.id, req.body, req.user);
            res.status(200).json({
                success: true,
                message: 'Workspace actualizado con éxito',
                data: workspace
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async deleteWorkspace(req, res) {
        try {
            await workspaceService.deleteWorkspace(req.params.id, req.user);
            res.status(200).json({
                success: true,
                message: 'Workspace eliminado con éxito'
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async addMember(req, res) {
        try {
            const { email, role } = req.body;
            const workspace = await workspaceService.addMember(req.params.id, email, role, req.user);
            res.status(200).json({
                success: true,
                message: 'Miembro añadido con éxito',
                data: workspace
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async removeMember(req, res) {
        try {
            const workspace = await workspaceService.removeMember(req.params.id, req.params.userId, req.user);
            res.status(200).json({
                success: true,
                message: 'Miembro removido con éxito',
                data: workspace
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}

export default new WorkspaceController();
