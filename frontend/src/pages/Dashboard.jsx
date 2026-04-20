import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Trash2, Edit2, MapPin, Calendar as CalendarIcon } from 'lucide-react';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [eventsRes, catsRes] = await Promise.all([
                api.get('/events'),
                api.get('/categories')
            ]);
            setEvents(eventsRes.data.data);
            setCategories(catsRes.data.data);
        } catch (err) {
            console.error('Error fetching data', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/events/${editingId}`, formData);
            } else {
                await api.post('/events', formData);
            }
            setFormData({ title: '', description: '', date: '', location: '', category: '' });
            setEditingId(null);
            setShowForm(false);
            fetchData();
        } catch (err) {
            alert('Error al guardar evento. Asegúrate de que todos los campos sean válidos.');
        }
    };

    const handleEdit = (event) => {
        setEditingId(event._id);
        setFormData({
            title: event.title,
            description: event.description,
            date: new Date(event.date).toISOString().split('T')[0],
            location: event.location,
            category: event.category._id
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este evento?')) {
            try {
                await api.delete(`/events/${id}`);
                fetchData();
            } catch (err) {
                alert('Error al eliminar evento');
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Mis Eventos</h1>
                <button 
                    className="btn-primary" 
                    onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', description: '', date: '', location: '', category: '' }); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Plus size={20} /> {showForm ? 'Cancelar' : 'Nuevo Evento'}
                </button>
            </div>

            {showForm && (
                <div className="glass" style={{ padding: '25px', borderRadius: '16px', marginBottom: '40px' }}>
                    <h3>{editingId ? 'Editar Evento' : 'Crear Nuevo Evento'}</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label>Título</label>
                            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                        </div>
                        <div>
                            <label>Categoría</label>
                            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
                                <option value="">Selecciona una categoría</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label>Descripción</label>
                            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows="3" />
                        </div>
                        <div>
                            <label>Fecha</label>
                            <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                        </div>
                        <div>
                            <label>Ubicación</label>
                            <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                                {editingId ? 'Actualizar Evento' : 'Guardar Evento'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
                {events.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', gridColumn: 'span 3', padding: '50px' }}>
                        No tienes eventos programados. ¡Crea uno nuevo!
                    </p>
                ) : (
                    events.map(event => (
                        <div key={event._id} className="glass" style={{ padding: '25px', borderRadius: '16px', position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                                <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    {event.category?.name || 'Sin categoría'}
                                </span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Edit2 size={18} style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={() => handleEdit(event)} />
                                    <Trash2 size={18} style={{ cursor: 'pointer', color: 'var(--danger)' }} onClick={() => handleDelete(event._id)} />
                                </div>
                            </div>
                            <h3 style={{ marginBottom: '10px' }}>{event.title}</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>{event.description}</p>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <CalendarIcon size={16} /> {new Date(event.date).toLocaleDateString()}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <MapPin size={16} /> {event.location}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
