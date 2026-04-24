import { useState, useEffect } from 'react';
import api from '../services/api';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    
    // Formulario Creación Directa
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newIsAdmin, setNewIsAdmin] = useState(false);
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data.data);
        } catch (err) {
            console.error('Error al obtener usuarios', err);
        }
    };

    const handleUpdateRole = async (id, currentStatus) => {
        const action = currentStatus ? 'quitar' : 'dar';
        if (window.confirm(`¿Seguro que deseas ${action} permisos de Administrador a este usuario?`)) {
            try {
                await api.put(`/admin/users/${id}/role`, { isAdmin: !currentStatus });
                fetchUsers();
                alert('Rol actualizado con éxito');
            } catch (err) {
                alert('Error al actualizar rol');
            }
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/admin/users', { 
                name: newName, 
                email: newEmail, 
                password: newPassword, 
                isAdmin: newIsAdmin 
            });
            alert('Usuario creado correctamente');
            setNewName('');
            setNewEmail('');
            setNewPassword('');
            setNewIsAdmin(false);
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || 'Error al crear usuario');
        } finally {
            setLoading(false);
        }
    };

    return {
        users,
        newName, setNewName,
        newEmail, setNewEmail,
        newPassword, setNewPassword,
        newIsAdmin, setNewIsAdmin,
        loading,
        handleUpdateRole,
        handleCreateUser
    };
};
