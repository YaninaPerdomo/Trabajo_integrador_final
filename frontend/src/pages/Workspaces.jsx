import { useWorkspaces } from '../hooks/useWorkspaces';
import { Plus, Trash2, Edit2, Users, Shield, Globe, Lock, UserPlus, MessageSquare, Info, Link as LinkIcon, FileText, CheckCircle, Clock, ArrowRight, UserMinus, Send, Mail, Hash, PlusCircle } from 'lucide-react';
import Chat from '../components/Chat';

const Workspaces = () => {
    const {
        user,
        workspaces,
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
    } = useWorkspaces();

    return (
        <div style={{ paddingBottom: '100px' }}>
            {!selectedWorkspace ? (
                <>
                    <div className="glass invite-section" style={{ padding: '20px', borderRadius: '15px', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                        <div>
                            <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Mail size={18} color="var(--primary)" /> Invitar a alguien a la comunidad
                            </h4>
                            <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cualquier usuario puede invitar a nuevos miembros.</p>
                        </div>
                        <form className="invite-form" onSubmit={handleSendGeneralInvite} style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
                            <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="Email del invitado" required style={{ marginBottom: 0, width: '250px' }} />
                            <button type="submit" className="btn-primary" disabled={inviteLoading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
                                {inviteLoading ? '...' : <Send size={18} />}
                            </button>
                        </form>
                    </div>

                    <h1 className="explore-title" style={{ marginBottom: '10px', textAlign: 'center' }}>¿Qué deseas explorar hoy?</h1>
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '50px' }}>Selecciona una categoría para comenzar a aprender y compartir.</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '60px' }}>
                        {allAvailableWorkspaces.length === 0 ? (
                            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No hay espacios disponibles.</p>
                        ) : (
                            allAvailableWorkspaces.map((ws, i) => {
                                const colors = ['var(--neuro-blue)', 'var(--neuro-green)', 'var(--neuro-purple)', 'var(--neuro-red)'];
                                const color = colors[i % colors.length];
                                return (
                                <div key={ws._id} className="glass" style={{ 
                                    padding: '30px', 
                                    borderRadius: '20px', 
                                    borderTop: `6px solid ${color}`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'default'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div className="hide-on-mobile" style={{ width: '60px', height: '60px', borderRadius: '50%', background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: color }}>
                                        <Info size={30} />
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '25px', flex: 1 }}>{ws.description || 'Sin descripción'}</p>
                                    <button className="btn-primary" style={{ width: '100%', background: color, fontSize: '1.1rem', padding: '12px' }} onClick={() => setSelectedWorkspace(ws)}>
                                        {ws.name}
                                    </button>
                                </div>
                                );
                            })
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: user?.isAdmin && pendingWorkspaces.length > 0 ? '1fr 1fr' : '1fr', gap: '30px', marginBottom: '40px' }}>
                        <div>
                            <h2 style={{ marginBottom: '20px' }}>Mis Espacios</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {workspaces.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No tienes espacios creados aún.</p>
                                ) : (
                                    workspaces.map(ws => (
                                        <div key={ws._id} className="glass" style={{ padding: '15px', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setSelectedWorkspace(ws)}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4 style={{ margin: 0 }}>{ws.name}</h4>
                                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                    {!ws.isApproved && <span style={{ fontSize: '0.7rem', color: 'var(--neuro-yellow)', background: 'rgba(255,171,0,0.1)', padding: '2px 8px', borderRadius: '10px' }}>Pendiente</span>}
                                                    {ws.visibility === 'privado' ? <Lock size={14} color="var(--neuro-red)" /> : <Globe size={14} color="var(--success)" />}
                                                </div>
                                            </div>
                                            <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ws.description?.substring(0, 60)}...</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {user?.isAdmin && pendingWorkspaces.length > 0 && (
                            <div className="glass" style={{ padding: '25px', borderRadius: '15px', border: '1px solid var(--neuro-yellow)' }}>
                                <h3 style={{ color: 'var(--neuro-yellow)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Shield size={20} /> Pendientes de Aprobación
                                </h3>
                                <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
                                    {pendingWorkspaces.map(ws => (
                                        <div key={ws._id} style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{ws.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Por: {ws.createdBy?.name}</div>
                                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                                <button className="btn-secondary" style={{ flex: 1, fontSize: '0.75rem', padding: '5px' }} onClick={() => setSelectedWorkspace(ws)}>
                                                    Ver
                                                </button>
                                                <button className="btn-primary" style={{ flex: 1, fontSize: '0.75rem', padding: '5px', background: 'var(--success)' }} onClick={() => handleApprove(ws._id)}>
                                                    Aprobar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="glass" style={{ padding: '25px', borderRadius: '15px' }}>
                        <h3>¿Deseas debatir un tema nuevo?</h3>
                        <form onSubmit={handleCreateWorkspace} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                            <div>
                                <label>Título</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ej. Dieta específica" />
                            </div>
                            <div>
                                <label>Descripción breve</label>
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="De qué trata el espacio..." />
                            </div>
                            <div>
                                <label>Visibilidad</label>
                                <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                                    <option value="público">Público (Wiki)</option>
                                    <option value="privado">Privado (Solo invitados)</option>
                                </select>
                            </div>
                            <button type="submit" className="btn-primary">Proponer</button>
                        </form>
                    </div>
                </>
            ) : (
                <div className="glass" style={{ padding: '40px', borderRadius: '25px', minHeight: '80vh' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button className="btn-secondary" onClick={() => { setSelectedWorkspace(null); setSelectedChannel(null); setShowAddChannel(false); }}>
                                ← Volver
                            </button>
                            {canManageResources && (
                                <button className="btn-secondary" onClick={handleDeleteWorkspace} style={{ color: 'var(--neuro-red)', borderColor: 'var(--neuro-red)' }}>
                                    <Trash2 size={16} style={{ marginRight: '5px' }} /> Eliminar Espacio
                                </button>
                            )}
                        </div>
                        <div style={{ textAlign: 'right', flex: 1, marginLeft: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
                                {selectedWorkspace.visibility === 'público' ? <Globe size={18} color="var(--success)" /> : <Lock size={18} color="var(--neuro-red)" />}
                                <h2 style={{ margin: 0 }}>{selectedWorkspace.name}</h2>
                            </div>
                            {isEditingDescription ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end', marginTop: '10px' }}>
                                    <textarea 
                                        value={editDescriptionContent} 
                                        onChange={(e) => setEditDescriptionContent(e.target.value)} 
                                        rows="3" 
                                        style={{ width: '100%', maxWidth: '500px', fontSize: '0.9rem', padding: '10px' }}
                                    />
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <button className="btn-primary" onClick={handleSaveDescription} style={{ padding: '5px 10px', fontSize: '0.8rem' }}>Guardar</button>
                                        <button className="btn-secondary" onClick={() => setIsEditingDescription(false)} style={{ padding: '5px 10px', fontSize: '0.8rem' }}>Cancelar</button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', marginTop: '5px', flexWrap: 'wrap' }}>
                                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>{selectedWorkspace.description}</p>
                                    {canManageResources && (
                                        <button 
                                            onClick={() => {
                                                setEditDescriptionContent(selectedWorkspace.description || '');
                                                setIsEditingDescription(true);
                                            }} 
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }} 
                                            title="Editar descripción"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* SECCIÓN DE RECURSOS (SIEMPRE ARRIBA) */}
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FileText size={20} color="var(--neuro-green)" /> Recursos y Enlaces de Interés
                            </h3>
                            {canManageResources && (
                                <button className="btn-primary" onClick={() => document.getElementById('resource-form').scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: '0.8rem', padding: '8px 15px' }}>
                                    + Agregar Recurso
                                </button>
                            )}
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                            {selectedWorkspace.resources?.length === 0 ? (
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No se han publicado recursos todavía.</p>
                            ) : (
                                selectedWorkspace.resources?.map((res, i) => (
                                    <div key={i} style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        {editingResourceIndex === i ? (
                                            <form onSubmit={handleSaveEditResource} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <input type="text" value={editResourceTitle} onChange={(e) => setEditResourceTitle(e.target.value)} placeholder="Título del recurso" required style={{ fontSize: '0.9rem', padding: '8px' }} />
                                                <input type="url" value={editResourceUrl} onChange={(e) => setEditResourceUrl(e.target.value)} placeholder="Link (URL completa)" style={{ fontSize: '0.9rem', padding: '8px' }} />
                                                <textarea value={editResourceContent} onChange={(e) => setEditResourceContent(e.target.value)} placeholder="Breve descripción o contenido..." required rows="6" style={{ fontSize: '0.9rem', padding: '12px', minHeight: '150px', resize: 'vertical' }} />
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button type="submit" className="btn-primary" style={{ padding: '5px 10px', fontSize: '0.8rem', flex: 1 }}>Guardar</button>
                                                    <button type="button" className="btn-secondary" onClick={handleCancelEditResource} style={{ padding: '5px 10px', fontSize: '0.8rem', flex: 1 }}>Cancelar</button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '1rem', flex: 1 }}>
                                                        {res.url ? <LinkIcon size={16} color="var(--neuro-blue)" /> : <FileText size={16} color="var(--neuro-green)" />}
                                                        {res.title}
                                                    </h4>
                                                    {canManageResources && (
                                                        <div style={{ display: 'flex', gap: '5px' }}>
                                                            <button onClick={() => handleStartEditResource(i, res)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }} title="Editar">
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button onClick={() => handleDeleteResource(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neuro-red)' }} title="Eliminar">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: '0 0 10px 0' }}>
                                                    {expandedResources.includes(i) || !res.content || res.content.length <= 150 
                                                        ? res.content 
                                                        : `${res.content.substring(0, 150)}...`}
                                                </p>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                                                    {res.content && res.content.length > 150 && (
                                                        <button 
                                                            onClick={() => toggleExpandResource(i)} 
                                                            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}
                                                        >
                                                            {expandedResources.includes(i) ? 'Ver menos' : 'Ver más'}
                                                        </button>
                                                    )}
                                                    {res.url && (
                                                        <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 'bold', textDecoration: 'none' }}>
                                                            Ver Enlace →
                                                        </a>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '40px 0' }} />

                    {/* SECCIÓN DE CANALES, CHAT Y MIEMBROS */}
                    <div className={`workspace-grid ${selectedWorkspace.channels?.length > 0 ? 'with-channels' : 'without-channels'}`}>
                        
                        {/* SIDEBAR DE CANALES (solo si el workspace tiene canales) */}
                        {selectedWorkspace.channels?.length > 0 && (
                            <div className="glass" style={{ padding: '15px', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                    <MessageSquare size={16} color="var(--primary)" /> Canales
                                </h4>

                                {/* Canal General (siempre primero) */}
                                <button
                                    onClick={() => setSelectedChannel(null)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        padding: '10px 12px', borderRadius: '10px',
                                        background: selectedChannel === null ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                                        border: selectedChannel === null ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                                        color: selectedChannel === null ? 'var(--primary)' : 'var(--text-muted)',
                                        cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedChannel === null ? '600' : '400',
                                        transition: 'all 0.2s ease', textAlign: 'left', width: '100%'
                                    }}
                                >
                                    <Hash size={14} /> general
                                </button>

                                {/* Canales del workspace */}
                                {selectedWorkspace.channels.map((ch, idx) => (
                                    <div key={ch._id || idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <button
                                            onClick={() => setSelectedChannel(ch)}
                                            title={ch.description || ch.name}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '8px',
                                                padding: '10px 12px', borderRadius: '10px', flex: 1,
                                                background: selectedChannel?._id === ch._id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                                                border: selectedChannel?._id === ch._id ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                                                color: selectedChannel?._id === ch._id ? 'var(--primary)' : 'var(--text-muted)',
                                                cursor: 'pointer', fontSize: '0.85rem', fontWeight: selectedChannel?._id === ch._id ? '600' : '400',
                                                transition: 'all 0.2s ease', textAlign: 'left', overflow: 'hidden',
                                                textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                                            }}
                                        >
                                            <Hash size={14} style={{ flexShrink: 0 }} /> {ch.name}
                                        </button>
                                        {canManageResources && (
                                            <button
                                                onClick={() => handleDeleteChannel(idx)}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neuro-red)', padding: '4px', opacity: 0.5, flexShrink: 0 }}
                                                title="Eliminar canal"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}

                                {/* Botón agregar canal (admin/owner) */}
                                {canManageResources && (
                                    <div style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                                        {showAddChannel ? (
                                            <form onSubmit={handleAddChannel} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <input
                                                    type="text" value={newChannelName} onChange={(e) => setNewChannelName(e.target.value)}
                                                    placeholder="Nombre del canal" required
                                                    style={{ fontSize: '0.8rem', padding: '8px', marginBottom: 0 }}
                                                />
                                                <input
                                                    type="text" value={newChannelDesc} onChange={(e) => setNewChannelDesc(e.target.value)}
                                                    placeholder="Descripción (opcional)"
                                                    style={{ fontSize: '0.8rem', padding: '8px', marginBottom: 0 }}
                                                />
                                                <div style={{ display: 'flex', gap: '5px' }}>
                                                    <button type="submit" className="btn-primary" style={{ flex: 1, fontSize: '0.75rem', padding: '6px' }}>Crear</button>
                                                    <button type="button" className="btn-secondary" onClick={() => setShowAddChannel(false)} style={{ flex: 1, fontSize: '0.75rem', padding: '6px' }}>×</button>
                                                </div>
                                            </form>
                                        ) : (
                                            <button
                                                onClick={() => setShowAddChannel(true)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '8px',
                                                    padding: '8px 12px', borderRadius: '10px', width: '100%',
                                                    background: 'transparent', border: '1px dashed rgba(255,255,255,0.15)',
                                                    color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <PlusCircle size={14} /> Añadir canal
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CHAT */}
                        <div>
                            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MessageSquare size={20} color="var(--primary)" /> 
                                {selectedChannel ? `# ${selectedChannel.name}` : 'Chat General'}
                            </h3>
                            {selectedChannel?.description && (
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '-10px', marginBottom: '15px' }}>
                                    {selectedChannel.description}
                                </p>
                            )}
                            <Chat 
                                workspaceId={selectedWorkspace._id} 
                                workspaceName={selectedWorkspace.name} 
                                channelId={selectedChannel?._id || null}
                                channelName={selectedChannel?.name || null}
                            />
                        </div>

                        <div className="hide-on-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {/* GESTIÓN DE RECURSOS (Solo Admin) */}
                            {canManageResources && (
                                <div id="resource-form" className="glass" style={{ padding: '20px', borderRadius: '20px' }}>
                                    <h4 style={{ marginBottom: '15px' }}>Añadir nuevo recurso</h4>
                                    <form onSubmit={handleAddResource} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <input type="text" value={resourceTitle} onChange={(e) => setResourceTitle(e.target.value)} placeholder="Título del recurso" required />
                                        <input type="url" value={resourceUrl} onChange={(e) => setResourceUrl(e.target.value)} placeholder="Link (URL completa)" />
                                        <textarea value={resourceContent} onChange={(e) => setResourceContent(e.target.value)} placeholder="Breve descripción o contenido..." required rows="3" />
                                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Publicar Recurso</button>
                                    </form>
                                </div>
                            )}

                            {/* Agregar canales para workspaces que aún no tienen ninguno */}
                            {canManageResources && (!selectedWorkspace.channels || selectedWorkspace.channels.length === 0) && (
                                <div className="glass" style={{ padding: '20px', borderRadius: '20px' }}>
                                    <h4 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Hash size={16} /> Canales de Debate
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                                        Agrega canales temáticos para organizar las conversaciones.
                                    </p>
                                    {showAddChannel ? (
                                        <form onSubmit={handleAddChannel} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <input
                                                type="text" value={newChannelName} onChange={(e) => setNewChannelName(e.target.value)}
                                                placeholder="Nombre del canal" required style={{ fontSize: '0.85rem' }}
                                            />
                                            <input
                                                type="text" value={newChannelDesc} onChange={(e) => setNewChannelDesc(e.target.value)}
                                                placeholder="Descripción (opcional)" style={{ fontSize: '0.85rem' }}
                                            />
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button type="submit" className="btn-primary" style={{ flex: 1, fontSize: '0.8rem' }}>Crear Canal</button>
                                                <button type="button" className="btn-secondary" onClick={() => setShowAddChannel(false)} style={{ flex: 1, fontSize: '0.8rem' }}>Cancelar</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button onClick={() => setShowAddChannel(true)} className="btn-primary" style={{ width: '100%', fontSize: '0.85rem' }}>
                                            <PlusCircle size={14} style={{ marginRight: '5px' }} /> Crear primer canal
                                        </button>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Workspaces;
