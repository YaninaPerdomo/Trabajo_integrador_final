import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const useChat = ({ workspaceId, channelId }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const fetchMessages = async () => {
        try {
            let url = `/messages/${workspaceId}`;
            if (channelId) {
                url += `?channelId=${channelId}`;
            }
            const res = await api.get(url);
            setMessages(res.data.data);
        } catch (err) {
            console.error('Error al obtener mensajes', err);
        }
    };

    useEffect(() => {
        if (workspaceId) {
            fetchMessages();
            const interval = setInterval(fetchMessages, 4000); // Polling cada 4s para reducir carga
            return () => clearInterval(interval);
        }
    }, [workspaceId, channelId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const payload = {
                workspaceId,
                content: newMessage.trim()
            };
            if (channelId) {
                payload.channelId = channelId;
            }
            const res = await api.post('/messages', payload);
            setMessages(prev => [...prev, res.data.data]);
            setNewMessage('');
        } catch (err) {
            alert(err.response?.data?.message || 'Error al enviar mensaje');
        }
    };

    return {
        user,
        messages,
        newMessage,
        setNewMessage,
        handleSendMessage,
        chatContainerRef
    };
};
