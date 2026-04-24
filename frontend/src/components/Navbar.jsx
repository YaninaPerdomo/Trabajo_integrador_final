import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Calendar, PlusCircle, LayoutGrid, Info } from 'lucide-react';
import InfinityLogo from './InfinityLogo';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="container">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <InfinityLogo size={45} />
                <h2 style={{ fontSize: '1.6rem', fontWeight: '900', letterSpacing: '-1px', background: 'linear-gradient(to right, var(--text-main), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Autismo Recursos
                </h2>
            </Link>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {user ? (
                    <>
                        {user.isAdmin && <Link to="/users" className="nav-link" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Usuarios</Link>}
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
