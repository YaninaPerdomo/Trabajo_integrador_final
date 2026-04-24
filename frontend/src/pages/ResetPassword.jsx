import { useResetPassword } from '../hooks/useResetPassword';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
    const {
        password, setPassword,
        confirmPassword, setConfirmPassword,
        showPassword, setShowPassword,
        showConfirmPassword, setShowConfirmPassword,
        message, error,
        loading,
        handleSubmit
    } = useResetPassword();

    return (
        <div className="glass" style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', borderRadius: '16px' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Nueva Contraseña</h2>
            
            {message ? (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--success)', marginBottom: '20px' }}>{message}</p>
                    <p style={{ color: 'var(--text-muted)' }}>Redirigiendo al login...</p>
                </div>
            ) : (
                <>
                    {error && <p style={{ color: 'var(--danger)', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px', position: 'relative' }}>
                            <label>Nueva Contraseña</label>
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
                                style={{ position: 'absolute', right: '10px', top: '38px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div style={{ marginBottom: '20px', position: 'relative' }}>
                            <label>Confirmar Contraseña</label>
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                                style={{ paddingRight: '40px' }}
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ position: 'absolute', right: '10px', top: '38px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Guardando...' : 'Guardar nueva contraseña'}
                        </button>
                    </form>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link to="/login" style={{ color: 'var(--text-muted)' }}>Volver al login</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResetPassword;
