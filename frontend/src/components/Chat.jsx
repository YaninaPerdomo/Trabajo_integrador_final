import { Send } from 'lucide-react';
import { useChat } from '../hooks/useChat';

const Chat = ({ workspaceId, workspaceName, channelId, channelName }) => {
    const { 
        user,
        messages, 
        newMessage, 
        setNewMessage, 
        handleSendMessage, 
        chatContainerRef 
    } = useChat({ workspaceId, channelId });

    const displayTitle = channelName ? `# ${channelName}` : workspaceName;

    return (
        <div className="glass" style={{ display: 'flex', flexDirection: 'column', height: '500px', borderRadius: '15px', overflow: 'hidden' }}>
            <div style={{ padding: '15px 20px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>{displayTitle}</h3>
            </div>
            
            <div ref={chatContainerRef} style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {messages.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '20px', fontSize: '0.9rem' }}>No hay mensajes aún. ¡Sé el primero en hablar!</p>
                ) : (
                    messages.map((msg, index) => {
                        const isMe = msg.user?._id === user?.id || msg.user === user?.id;
                        return (
                            <div key={msg._id || index} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px', marginLeft: isMe ? '0' : '5px', textAlign: isMe ? 'right' : 'left' }}>
                                    {msg.user?.name || 'Usuario'} • {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recién'}
                                </div>
                                <div style={{ 
                                    padding: '10px 15px', 
                                    borderRadius: '15px', 
                                    background: isMe ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                    color: isMe ? 'white' : 'inherit',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                    fontSize: '0.9rem'
                                }}>
                                    {msg.content}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <form onSubmit={handleSendMessage} style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px' }}>
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                    placeholder={channelName ? `Escribir en #${channelName}...` : 'Escribe un mensaje...'} 
                    style={{ flex: 1, marginBottom: 0, fontSize: '0.9rem' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '10px', borderRadius: '10px' }}>
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default Chat;
