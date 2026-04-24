import { useState, useEffect } from 'react';
import api from '../services/api';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data.data);
        } catch (err) {
            console.error('Error al obtener categorías', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/categories/${editingId}`, { name, description });
            } else {
                await api.post('/categories', { name, description });
            }
            setName('');
            setDescription('');
            setEditingId(null);
            fetchCategories();
        } catch (err) {
            alert('Error al guardar categoría');
        }
    };

    const handleEdit = (cat) => {
        setEditingId(cat._id);
        setName(cat.name);
        setDescription(cat.description);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar esta categoría?')) {
            try {
                await api.delete(`/categories/${id}`);
                fetchCategories();
            } catch (err) {
                alert('No se puede eliminar la categoría (podría tener eventos asociados)');
            }
        }
    };

    return {
        categories,
        name, setName,
        description, setDescription,
        editingId,
        handleSubmit,
        handleEdit,
        handleDelete
    };
};
