import { useLogin } from '../hooks/useLogin';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const {
        email, setEmail,
        password, setPassword,
        showPassword, setShowPassword,
        error,
        resendLoading,
        resendMessage,
        handleSubmit,
        handleResendVerification
    } = useLogin();

    return (
        <div className="glass" style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Iniciar Sesión</h2>
            {resendMessage && <p style={{ color: 'var(--success)', marginBottom: '10px', textAlign: 'center' }}>{resendMessage}</p>}
            {error && (
                <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--danger)', marginBottom: '5px' }}>{error}</p>
                    {error.includes('verifica tu correo electrónico') && (
                        <button 
                            onClick={handleResendVerification} 
                            disabled={resendLoading}
                            style={{ 
                                background: 'none', border: 'none', color: 'var(--primary)', 
                                textDecoration: 'underline', cursor: 'pointer', fontSize: '0.9rem' 
                            }}
                        >
                            {resendLoading ? 'Enviando...' : 'Reenviar correo de verificación'}
                        </button>
                    )}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.email || e.target.value)} required />
                </div>
                <div style={{ marginBottom: '20px', position: 'relative' }}>
                    <label>Contraseña</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ paddingRight: '40px' }}
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ 
                            position: 'absolute', 
                            right: '10px', 
                            top: '38px', 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            color: 'var(--text-muted)'
                        }}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Ingresar</button>
            </form>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/forgot-password" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>
            <p style={{ marginTop: '10px', textAlign: 'center', color: 'var(--text-muted)' }}>
                ¿No tienes cuenta? <Link to="/register" style={{ color: 'var(--primary)' }}>Regístrate</Link>
            </p>
        </div>
    );
};

export default Login;
