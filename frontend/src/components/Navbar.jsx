import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar, PlusCircle, LayoutGrid } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="container">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={28} color="var(--primary)" />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Eventos</h2>
            </Link>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {user ? (
                    <>
                        <Link to="/" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Eventos</Link>
                        <Link to="/categories" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Categorías</Link>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Hola, {user.name}</span>
                        <button onClick={handleLogout} style={{ background: 'transparent', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <LogOut size={18} /> Salir
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Iniciar Sesión</Link>
                        <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
