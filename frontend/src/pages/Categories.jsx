import { useCategories } from '../hooks/useCategories';
import { Plus, Trash2, Edit2 } from 'lucide-react';

const Categories = () => {
    const {
        categories,
        name, setName,
        description, setDescription,
        editingId,
        handleSubmit,
        handleEdit,
        handleDelete
    } = useCategories();

    return (
        <div>
            <h1 style={{ marginBottom: '30px' }}>Gestionar Categorías</h1>
            
            <div className="glass" style={{ padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
                <h3>{editingId ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'end', marginTop: '15px' }}>
                    <div>
                        <label>Nombre</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Descripción</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '12px 25px' }}>
                        {editingId ? 'Actualizar' : 'Agregar'}
                    </button>
                </form>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {categories.map(cat => (
                    <div key={cat._id} className="glass" style={{ padding: '20px', borderRadius: '12px', position: 'relative' }}>
                        <h4>{cat.name}</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>{cat.description}</p>
                        <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '10px' }}>
                            <Edit2 size={18} style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={() => handleEdit(cat)} />
                            <Trash2 size={18} style={{ cursor: 'pointer', color: 'var(--danger)' }} onClick={() => handleDelete(cat._id)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
