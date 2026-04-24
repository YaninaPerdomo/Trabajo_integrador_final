import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResendMessage('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    const handleResendVerification = async () => {
        setResendLoading(true);
        setError('');
        try {
            const response = await api.post('/auth/resend-verification', { email });
            setResendMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al reenviar el correo');
        } finally {
            setResendLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        showPassword, setShowPassword,
        error, setError,
        resendLoading,
        resendMessage,
        handleSubmit,
        handleResendVerification
    };
};
