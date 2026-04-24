import Message from '../models/Message.js';
import Workspace from '../models/Workspace.js';

class MessageController {
    async sendMessage(req, res) {
        try {
            const { workspaceId, content, channelId } = req.body;
            const workspace = await Workspace.findById(workspaceId);
            
            if (!workspace) {
                return res.status(404).json({ success: false, message: 'Workspace no encontrado' });
            }

            // Si es privado, solo miembros pueden hablar
            if (workspace.visibility === 'privado') {
                const isMember = workspace.members.some(member => member.user?.toString() === req.user.id);
                if (!isMember && workspace.createdBy?.toString() !== req.user.id) {
                    return res.status(403).json({ success: false, message: 'No puedes hablar en un workspace privado si no eres miembro' });
                }
            }
            // Si es público, cualquiera puede hablar (requerimiento del usuario)

            const messageData = {
                workspace: workspaceId,
                user: req.user.id,
                content
            };

            // Si se proporciona un channelId, lo incluimos
            if (channelId) {
                messageData.channelId = channelId;
            }

            const message = await Message.create(messageData);

            await message.populate('user', 'name');

            res.status(201).json({
                success: true,
                data: message
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getMessages(req, res) {
        try {
            const { workspaceId } = req.params;
            const { channelId } = req.query;
            const workspace = await Workspace.findById(workspaceId);

            if (!workspace) {
                return res.status(404).json({ success: false, message: 'Workspace no encontrado' });
            }

            // Si es privado, solo miembros pueden ver mensajes
            if (workspace.visibility === 'privado') {
                const isMember = workspace.members.some(member => member.user?.toString() === req.user.id);
                if (!isMember && workspace.createdBy?.toString() !== req.user.id) {
                    return res.status(403).json({ success: false, message: 'No puedes ver mensajes de un workspace privado' });
                }
            }

            // Construir query: filtrar por workspace y opcionalmente por canal
            const query = { workspace: workspaceId };
            if (channelId) {
                query.channelId = channelId;
            } else {
                // Si no se especifica canal, mostrar mensajes del chat general
                // (mensajes sin channelId o con channelId = null)
                query.$or = [
                    { channelId: { $exists: false } },
                    { channelId: null }
                ];
            }

            const messages = await Message.find(query)
                .populate('user', 'name')
                .sort({ createdAt: 1 });

            res.status(200).json({
                success: true,
                data: messages
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new MessageController();
