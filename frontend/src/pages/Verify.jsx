import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const Verify = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, error

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await api.get(`/auth/verify/${token}`);
                setStatus('success');
            } catch (err) {
                setStatus('error');
            }
        };
        verifyToken();
    }, [token]);

    return (
        <div className="glass" style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', borderRadius: '16px', textAlign: 'center' }}>
            {status === 'verifying' && <h2>Verificando tu cuenta...</h2>}
            {status === 'success' && (
                <>
                    <h2 style={{ color: 'var(--success)' }}>¡Cuenta Verificada!</h2>
                    <p style={{ margin: '20px 0' }}>Ahora puedes iniciar sesión con tus credenciales.</p>
                    <Link to="/login" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Ir al Login</Link>
                </>
            )}
            {status === 'error' && (
                <>
                    <h2 style={{ color: 'var(--danger)' }}>Error de Verificación</h2>
                    <p style={{ margin: '20px 0' }}>El enlace ha expirado o es inválido.</p>
                    <Link to="/register" style={{ color: 'var(--primary)' }}>Intentar registrarse de nuevo</Link>
                </>
            )}
        </div>
    );
};

export default Verify;
