import { useState, useEffect } from 'react';
import workspaceService from '../services/workspaceService';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const useWorkspaces = () => {
    const { user } = useAuth();
    const [workspaces, setWorkspaces] = useState([]);
    const [publicWorkspaces, setPublicWorkspaces] = useState([]);
    const [pendingWorkspaces, setPendingWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);

    // Canales
    const [selectedChannel, setSelectedChannel] = useState(null); // null = chat general
    const [newChannelName, setNewChannelName] = useState('');
    const [newChannelDesc, setNewChannelDesc] = useState('');
    const [showAddChannel, setShowAddChannel] = useState(false);
    
    // Invitación General
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteLoading, setInviteLoading] = useState(false);

    // Formulario para proponer nuevo
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [visibility, setVisibility] = useState('público');

    // Recursos
    const [resourceTitle, setResourceTitle] = useState('');
    const [resourceUrl, setResourceUrl] = useState('');
    const [resourceContent, setResourceContent] = useState('');

    // Edición de Recursos
    const [editingResourceIndex, setEditingResourceIndex] = useState(null);
    const [editResourceTitle, setEditResourceTitle] = useState('');
    const [editResourceUrl, setEditResourceUrl] = useState('');
    const [editResourceContent, setEditResourceContent] = useState('');

    // Expandir recursos largos
    const [expandedResources, setExpandedResources] = useState([]);

    const toggleExpandResource = (index) => {
        setExpandedResources(prev => 
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    // Edición de Workspace
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [editDescriptionContent, setEditDescriptionContent] = useState('');

    // Miembros
    const [memberEmail, setMemberEmail] = useState('');
    const [memberRole, setMemberRole] = useState('usuario');

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user?.id]);

    const fetchData = async () => {
        try {
            const [myRes, pubRes] = await Promise.all([
                workspaceService.getMyWorkspaces(),
                workspaceService.getPublicWorkspaces()
            ]);
            setWorkspaces(myRes.data.data);
            setPublicWorkspaces(pubRes.data.data);
            
            if (user?.isAdmin) {
                const pendRes = await workspaceService.getPendingWorkspaces();
                setPendingWorkspaces(pendRes.data.data);
            }
        } catch (err) {
            console.error('Error al obtener datos', err);
        }
    };

    const handleSendGeneralInvite = async (e) => {
        e.preventDefault();
        setInviteLoading(true);
        try {
            await api.post('/auth/invite', { email: inviteEmail });
            alert('Invitación enviada con éxito');
            setInviteEmail('');
        } catch (err) {
            alert('Error al enviar invitación');
        } finally {
            setInviteLoading(false);
        }
    };

    const handleCreateWorkspace = async (e) => {
        e.preventDefault();
        try {
            await workspaceService.createWorkspace({ 
                name: name.trim(), 
                description: description.trim(), 
                topic: name.trim(), 
                visibility 
            });
            setName('');
            setDescription('');
            setVisibility('público');
            fetchData();
            alert('Propuesta enviada con éxito. Los administradores revisarán el contenido para espacios públicos.');
        } catch (err) {
            alert(err.response?.data?.message || 'Error al crear');
        }
    };

    const handleEnterWorkspace = (topicTitle) => {
        const allAvailable = [...publicWorkspaces, ...workspaces];
        const existing = allAvailable.find(ws => ws.name.toLowerCase() === topicTitle.toLowerCase());
        
        if (existing) {
            setSelectedWorkspace(existing);
            setEditingResourceIndex(null);
        } else {
            alert(`El espacio "${topicTitle}" aún no ha sido creado o aprobado.`);
        }
    };

    const handleAddResource = async (e) => {
        e.preventDefault();
        const newResources = [...(selectedWorkspace.resources || []), { title: resourceTitle.trim(), url: resourceUrl.trim(), content: resourceContent.trim() }];
        try {
            const res = await workspaceService.updateResources(selectedWorkspace._id, newResources);
            setSelectedWorkspace(res.data.data);
            setResourceTitle('');
            setResourceUrl('');
            setResourceContent('');
            alert('Contenido añadido con éxito');
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    const handleDeleteResource = async (index) => {
        if (!window.confirm("¿Seguro que deseas eliminar este recurso?")) return;
        const newResources = selectedWorkspace.resources.filter((_, i) => i !== index);
        try {
            const res = await workspaceService.updateResources(selectedWorkspace._id, newResources);
            setSelectedWorkspace(res.data.data);
            alert('Recurso eliminado');
        } catch (err) {
            alert('Error al eliminar recurso');
        }
    };

    const handleStartEditResource = (index, resource) => {
        setEditingResourceIndex(index);
        setEditResourceTitle(resource.title);
        setEditResourceUrl(resource.url || '');
        setEditResourceContent(resource.content);
    };

    const handleSaveEditResource = async (e) => {
        e.preventDefault();
        const newResources = [...selectedWorkspace.resources];
        newResources[editingResourceIndex] = {
            title: editResourceTitle.trim(),
            url: editResourceUrl.trim(),
            content: editResourceContent.trim()
        };
        try {
            const res = await workspaceService.updateResources(selectedWorkspace._id, newResources);
            setSelectedWorkspace(res.data.data);
            setEditingResourceIndex(null);
            alert('Recurso actualizado con éxito');
        } catch (err) {
            alert('Error al actualizar recurso');
        }
    };

    const handleCancelEditResource = () => {
        setEditingResourceIndex(null);
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const res = await workspaceService.addMember(selectedWorkspace._id, memberEmail.trim(), memberRole);
            setMemberEmail('');
            setMemberRole('usuario');
            setSelectedWorkspace(res.data.data);
            alert('Miembro añadido con éxito');
        } catch (err) {
            alert(err.response?.data?.message || 'Error al invitar');
        }
    };

    const handleSaveDescription = async () => {
        try {
            const res = await workspaceService.updateWorkspace(selectedWorkspace._id, { description: editDescriptionContent.trim() });
            setSelectedWorkspace(res.data.data);
            setIsEditingDescription(false);
            fetchData();
            alert('Descripción actualizada con éxito');
        } catch (err) {
            alert('Error al actualizar descripción');
        }
    };

    const handleDeleteWorkspace = async () => {
        if (!window.confirm(`¿Estás seguro que deseas eliminar el espacio "${selectedWorkspace.name}" permanentemente? Esto no se puede deshacer.`)) return;
        
        try {
            await workspaceService.deleteWorkspace(selectedWorkspace._id);
            setSelectedWorkspace(null);
            setEditingResourceIndex(null);
            fetchData();
            alert('Espacio eliminado con éxito');
        } catch (err) {
            alert('Error al eliminar el espacio');
        }
    };

    const handleApprove = async (id) => {
        try {
            await workspaceService.approveWorkspace(id);
            fetchData();
            alert('Workspace aprobado');
        } catch (err) {
            alert('Error al aprobar');
        }
    };

    const handleAddChannel = async (e) => {
        e.preventDefault();
        const currentChannels = selectedWorkspace.channels || [];
        const updatedChannels = [...currentChannels, { name: newChannelName.trim(), description: newChannelDesc.trim() }];
        try {
            const res = await workspaceService.updateChannels(selectedWorkspace._id, updatedChannels);
            setSelectedWorkspace(res.data.data);
            setNewChannelName('');
            setNewChannelDesc('');
            setShowAddChannel(false);
            alert('Canal añadido con éxito');
        } catch (err) {
            alert(err.response?.data?.message || 'Error al añadir canal');
        }
    };

    const handleDeleteChannel = async (channelIndex) => {
        if (!window.confirm('¿Seguro que deseas eliminar este canal? Los mensajes del canal se conservarán pero no serán visibles.')) return;
        const updatedChannels = selectedWorkspace.channels.filter((_, i) => i !== channelIndex);
        try {
            const res = await workspaceService.updateChannels(selectedWorkspace._id, updatedChannels);
            setSelectedWorkspace(res.data.data);
            setSelectedChannel(null);
            alert('Canal eliminado');
        } catch (err) {
            alert('Error al eliminar canal');
        }
    };

    const isOwner = selectedWorkspace?.members?.some(m => {
        const memberId = m.user?._id || m.user;
        return memberId === user?.id && m.role === 'propietario';
    });
    const canManageResources = user?.isAdmin || isOwner;

    const allAvailableWorkspaces = [...publicWorkspaces, ...workspaces].filter((ws, index, self) =>
        index === self.findIndex((t) => t._id === ws._id)
    );

    return {
        user,
        workspaces,
        publicWorkspaces,
        pendingWorkspaces,
        selectedWorkspace, setSelectedWorkspace,
        selectedChannel, setSelectedChannel,
        newChannelName, setNewChannelName,
        newChannelDesc, setNewChannelDesc,
        showAddChannel, setShowAddChannel,
        inviteEmail, setInviteEmail,
        inviteLoading,
        name, setName,
        description, setDescription,
        visibility, setVisibility,
        resourceTitle, setResourceTitle,
        resourceUrl, setResourceUrl,
        resourceContent, setResourceContent,
        editingResourceIndex,
        editResourceTitle, setEditResourceTitle,
        editResourceUrl, setEditResourceUrl,
        editResourceContent, setEditResourceContent,
        expandedResources,
        toggleExpandResource,
        isEditingDescription, setIsEditingDescription,
        editDescriptionContent, setEditDescriptionContent,
        memberEmail, setMemberEmail,
        memberRole, setMemberRole,
        handleSendGeneralInvite,
        handleCreateWorkspace,
        handleEnterWorkspace,
        handleAddResource,
        handleDeleteResource,
        handleStartEditResource,
        handleSaveEditResource,
        handleCancelEditResource,
        handleAddMember,
        handleSaveDescription,
        handleDeleteWorkspace,
        handleApprove,
        handleAddChannel,
        handleDeleteChannel,
        canManageResources,
        allAvailableWorkspaces
    };
};
