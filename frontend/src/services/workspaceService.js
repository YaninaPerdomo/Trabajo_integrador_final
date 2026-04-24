import api from './api';

const workspaceService = {
    getMyWorkspaces: () => api.get('/workspaces/my'),
    getPublicWorkspaces: () => api.get('/workspaces/public'),
    getPendingWorkspaces: () => api.get('/workspaces/pending'),
    getWorkspace: (id) => api.get(`/workspaces/${id}`),
    createWorkspace: (data) => api.post('/workspaces', data),
    deleteWorkspace: (id) => api.delete(`/workspaces/${id}`),
    approveWorkspace: (id) => api.put(`/workspaces/${id}/approve`),
    updateWorkspace: (id, data) => api.put(`/workspaces/${id}`, data),
    updateResources: (id, resources) => api.put(`/workspaces/${id}/resources`, { resources }),
    updateChannels: (id, channels) => api.put(`/workspaces/${id}/channels`, { channels }),
    addMember: (id, email, role) => api.post(`/workspaces/${id}/members`, { email, role }),
    removeMember: (id, userId) => api.delete(`/workspaces/${id}/members/${userId}`),
};

export default workspaceService;
