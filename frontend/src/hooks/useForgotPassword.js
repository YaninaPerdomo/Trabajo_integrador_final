import { useState } from 'react';
import api from '../services/api';

export const useForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const response = await api.post('/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al enviar el correo');
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        message, error,
        loading,
        handleSubmit
    };
};
