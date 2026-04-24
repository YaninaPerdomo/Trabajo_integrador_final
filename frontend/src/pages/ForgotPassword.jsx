import { useForgotPassword } from '../hooks/useForgotPassword';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const {
        email, setEmail,
        message, error,
        loading,
        handleSubmit
    } = useForgotPassword();

    return (
        <div className="glass" style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Recuperar Contraseña</h2>
            {message && <p style={{ color: 'var(--success)', marginBottom: '10px', textAlign: 'center' }}>{message}</p>}
            {error && <p style={{ color: 'var(--danger)', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label>Email de tu cuenta</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="tu@email.com"
                    />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                </button>
            </form>
            
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/login" style={{ color: 'var(--text-muted)' }}>Volver al login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
