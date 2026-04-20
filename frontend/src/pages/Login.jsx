import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="glass" style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Iniciar Sesión</h2>
            {error && <p style={{ color: 'var(--danger)', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.email || e.target.value)} required />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Ingresar</button>
            </form>
            <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                ¿No tienes cuenta? <Link to="/register" style={{ color: 'var(--primary)' }}>Regístrate</Link>
            </p>
        </div>
    );
};

export default Login;
