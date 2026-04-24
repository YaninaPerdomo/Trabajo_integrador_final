import { useUsers } from '../hooks/useUsers';
import { User, Shield, UserPlus, ShieldAlert, Users as UsersIcon } from 'lucide-react';

const Users = () => {
    const {
        users,
        newName, setNewName,
        newEmail, setNewEmail,
        newPassword, setNewPassword,
        newIsAdmin, setNewIsAdmin,
        loading,
        handleUpdateRole,
        handleCreateUser
    } = useUsers();

    return (
        <div style={{ paddingBottom: '100px' }}>
            <h1 style={{ marginBottom: '30px' }}>Administración de Usuarios</h1>

            <div className="glass" style={{ padding: '30px', borderRadius: '20px', marginBottom: '40px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                    <UserPlus size={24} color="var(--primary)" /> Crear Nuevo Usuario Directamente
                </h3>
                <form onSubmit={handleCreateUser} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto auto', gap: '20px', alignItems: 'end' }}>
                    <div>
                        <label>Nombre Completo</label>
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required placeholder="Ej. Juan Pérez" />
                    </div>
                    <div>
                        <label>Correo Electrónico</label>
                        <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required placeholder="juan@ejemplo.com" />
                    </div>
                    <div>
                        <label>Contraseña Provisional</label>
                        <div style={{ position: 'relative' }}>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="••••••••" />
                        </div>
                    </div>
                    <div style={{ paddingBottom: '10px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={newIsAdmin} onChange={(e) => setNewIsAdmin(e.target.checked)} style={{ width: '20px', height: '20px' }} />
                            ¿Es Administrador?
                        </label>
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading} style={{ padding: '12px 30px' }}>
                        {loading ? 'Creando...' : 'Crear Usuario'}
                    </button>
                </form>
            </div>

            <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <UsersIcon size={28} /> Listado de la Comunidad
            </h2>
            <div className="glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <th style={{ padding: '20px' }}>Usuario</th>
                            <th style={{ padding: '20px' }}>Email</th>
                            <th style={{ padding: '20px' }}>Rol Actual</th>
                            <th style={{ padding: '20px', textAlign: 'center' }}>Acciones de Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: u.isAdmin ? 'rgba(255, 171, 0, 0.2)' : 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={20} color={u.isAdmin ? '#ffab00' : 'var(--primary)'} />
                                    </div>
                                    <span style={{ fontWeight: '600' }}>{u.name}</span>
                                </td>
                                <td style={{ padding: '20px', color: 'var(--text-muted)' }}>{u.email}</td>
                                <td style={{ padding: '20px' }}>
                                    {u.isAdmin ? 
                                        <span style={{ padding: '6px 12px', background: 'rgba(255, 171, 0, 0.1)', color: '#ffab00', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', width: 'fit-content' }}>
                                            <Shield size={14} /> ADMINISTRADOR
                                        </span> : 
                                        <span style={{ padding: '6px 12px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)', borderRadius: '20px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px', width: 'fit-content' }}>
                                            <User size={14} /> USUARIO
                                        </span>
                                    }
                                </td>
                                <td style={{ padding: '20px', textAlign: 'center' }}>
                                    <button 
                                        onClick={() => handleUpdateRole(u._id, u.isAdmin)} 
                                        style={{ 
                                            padding: '8px 16px', 
                                            borderRadius: '10px', 
                                            border: 'none', 
                                            background: u.isAdmin ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', 
                                            color: u.isAdmin ? '#ef4444' : '#22c55e',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        {u.isAdmin ? <><ShieldAlert size={16} /> Quitar Admin</> : <><Shield size={16} /> Hacer Admin</>}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
