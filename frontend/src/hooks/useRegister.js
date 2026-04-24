import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        showPassword, setShowPassword,
        message, setMessage,
        error, setError,
        handleSubmit
    };
};
