import { useRegister } from '../hooks/useRegister';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register = () => {
    const {
        name, setName,
        email, setEmail,
        password, setPassword,
        showPassword, setShowPassword,
        message,
        error,
        handleSubmit
    } = useRegister();

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
