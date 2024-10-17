import { useState, ChangeEvent, FormEvent } from 'react';
import authService from '../services/auth.service'; 
import { useNavigate } from 'react-router-dom';

const { register } = authService;

interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: string; 
}

const Register: React.FC = () => {
    const [formData, setFormData] = useState<RegisterData>({
        name: '',
        email: '',
        password: '',
        role: '',
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await register(formData);
            setSuccess('Registration successful! Please log in.');
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful registration
            }, 2000);
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="role" 
                    placeholder="Role" 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;