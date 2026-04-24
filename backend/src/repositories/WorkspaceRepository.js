import Workspace from '../models/Workspace.js';

class WorkspaceRepository {
    async create(workspaceData) {
        return await Workspace.create(workspaceData);
    }

    async findById(id) {
        return await Workspace.findById(id).populate('members.user', 'name email').populate('createdBy', 'name email');
    }

    async findAllPublic() {
        return await Workspace.find({ visibility: 'público', isApproved: true })
            .populate('createdBy', 'name')
            .populate('members.user', 'name email');
    }

    async findAllPending() {
        return await Workspace.find({ isApproved: false })
            .populate('createdBy', 'name email')
            .populate('members.user', 'name email');
    }

    async approve(id) {
        return await Workspace.findByIdAndUpdate(id, { isApproved: true }, { new: true })
            .populate('members.user', 'name email')
            .populate('createdBy', 'name email');
    }

    async findByUser(userId) {
        return await Workspace.find({
            $or: [
                { createdBy: userId },
                { 'members.user': userId }
            ]
        })
        .populate('createdBy', 'name')
        .populate('members.user', 'name email');
    }

    async update(id, workspaceData) {
        return await Workspace.findByIdAndUpdate(id, workspaceData, { new: true, runValidators: true })
            .populate('members.user', 'name email')
            .populate('createdBy', 'name email');
    }

    async delete(id) {
        return await Workspace.findByIdAndDelete(id);
    }

    async addMember(workspaceId, userId, role) {
        return await Workspace.findByIdAndUpdate(
            workspaceId,
            { $addToSet: { members: { user: userId, role } } },
            { new: true }
        ).populate('members.user', 'name email').populate('createdBy', 'name email');
    }

    async removeMember(workspaceId, userId) {
        return await Workspace.findByIdAndUpdate(
            workspaceId,
            { $pull: { members: { user: userId } } },
            { new: true }
        ).populate('members.user', 'name email').populate('createdBy', 'name email');
    }
}

export default new WorkspaceRepository();
