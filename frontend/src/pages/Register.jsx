import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password });
            setMessage('Registro exitoso. Revisa tu correo para verificar tu cuenta.');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrarse');
            setMessage('');
        }
    };

    return (
        <div className="glass" style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Crear Cuenta</h2>
            {message && <p style={{ color: 'var(--success)', marginBottom: '10px', textAlign: 'center' }}>{message}</p>}
            {error && <p style={{ color: 'var(--danger)', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
            
            {!message && (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Nombre</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>Registrarse</button>
                </form>
            )}
            
            <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--primary)' }}>Inicia Sesión</Link>
            </p>
        </div>
    );
};

export default Register;
