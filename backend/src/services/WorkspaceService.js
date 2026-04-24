import workspaceRepository from '../repositories/WorkspaceRepository.js';
import userRepository from '../repositories/UserRepository.js';

class WorkspaceService {
    async createWorkspace(workspaceData, user) {
        const workspace = await workspaceRepository.create({
            ...workspaceData,
            createdBy: user.id,
            members: [{ user: user.id, role: 'propietario' }]
        });
        // Retornar el workspace populado para que el frontend tenga los datos correctos
        return await workspaceRepository.findById(workspace._id);
    }

    async getMyWorkspaces(userId) {
        return await workspaceRepository.findByUser(userId);
    }

    async getPublicWorkspaces() {
        return await workspaceRepository.findAllPublic();
    }

    async getWorkspaceById(workspaceId, user) {
        const workspace = await workspaceRepository.findById(workspaceId);
        if (!workspace) throw new Error('Workspace no encontrado');

        if (workspace.visibility === 'privado' && !user.isAdmin) {
            const isMember = workspace.members.some(member => member.user?._id?.toString() === user.id.toString());
            if (!isMember && workspace.createdBy?._id?.toString() !== user.id.toString()) {
                throw new Error('No tienes acceso a este workspace privado');
            }
        }

        return workspace;
    }

    async addMember(workspaceId, memberEmail, role, adminUser) {
        const workspace = await workspaceRepository.findById(workspaceId);
        if (!workspace) throw new Error('Workspace no encontrado');

        const isOwner = workspace.members.some(member => 
            member.user?._id?.toString() === adminUser.id.toString() && member.role === 'propietario'
        );

        if (!isOwner && !adminUser.isAdmin) {
            throw new Error('Solo los propietarios o administradores pueden añadir miembros');
        }

        const userToAdd = await userRepository.findByEmail(memberEmail);
        if (!userToAdd) throw new Error('Usuario no encontrado con ese email. Debes invitarlo primero a la plataforma.');

        const alreadyMember = workspace.members.some(member => member.user?._id?.toString() === userToAdd._id.toString());
        if (alreadyMember) throw new Error('El usuario ya es miembro de este workspace');

        return await workspaceRepository.addMember(workspaceId, userToAdd._id, role);
    }

    async removeMember(workspaceId, userIdToRemove, adminUser) {
        const workspace = await workspaceRepository.findById(workspaceId);
        if (!workspace) throw new Error('Workspace no encontrado');

        const isOwner = workspace.members.some(member => 
            member.user?._id?.toString() === adminUser.id.toString() && member.role === 'propietario'
        );

        if (!isOwner && !adminUser.isAdmin) {
            throw new Error('Solo los propietarios pueden remover miembros');
        }

        if (workspace.createdBy?._id?.toString() === userIdToRemove.toString()) {
            throw new Error('No se puede remover al creador del workspace');
        }

        return await workspaceRepository.removeMember(workspaceId, userIdToRemove);
    }

    async getPendingWorkspaces() {
        return await workspaceRepository.findAllPending();
    }

    async approveWorkspace(workspaceId) {
        return await workspaceRepository.approve(workspaceId);
    }

    async updateResources(workspaceId, resources, user) {
        const workspace = await workspaceRepository.findById(workspaceId);
        if (!workspace) throw new Error('Workspace no encontrado');

        const isOwner = workspace.members.some(member => 
            member.user?._id?.toString() === user.id.toString() && member.role === 'propietario'
        );

        if (!isOwner && !user.isAdmin) {
            throw new Error('Solo propietarios o administradores pueden actualizar recursos');
        }

        return await workspaceRepository.update(workspaceId, { resources });
    }

    async updateChannels(workspaceId, channels, user) {
        const workspace = await workspaceRepository.findById(workspaceId);
        if (!workspace) throw new Error('Workspace no encontrado');

        const isOwner = workspace.members.some(member => 
            member.user?._id?.toString() === user.id.toString() && member.role === 'propietario'
        );

        if (!isOwner && !user.isAdmin) {
            throw new Error('Solo propietarios o administradores pueden actualizar canales');
        }

        return await workspaceRepository.update(workspaceId, { channels });
    }

    async updateWorkspace(workspaceId, workspaceData, user) {
        const workspace = await workspaceRepository.findById(workspaceId);
        if (!workspace) throw new Error('Workspace no encontrado');

        const isOwner = workspace.members.some(member => 
            member.user?._id?.toString() === user.id.toString() && member.role === 'propietario'
        );

        if (!isOwner && !user.isAdmin) {
            throw new Error('Solo propietarios o administradores pueden actualizar el workspace');
        }

        return await workspaceRepository.update(workspaceId, workspaceData);
    }

    async deleteWorkspace(workspaceId, user) {
        const workspace = await workspaceRepository.findById(workspaceId);
        if (!workspace) throw new Error('Workspace no encontrado');

        const isOwner = workspace.members.some(member => 
            member.user?._id?.toString() === user.id.toString() && member.role === 'propietario'
        );

        if (!isOwner && !user.isAdmin) {
            throw new Error('Solo propietarios o administradores pueden eliminar el workspace');
        }

        return await workspaceRepository.delete(workspaceId);
    }
}

export default new WorkspaceService();
