import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', borderRadius: 3 }}>
                    <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Register Account
                    </Typography>
                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal" required fullWidth label="Full Name"
                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            margin="normal" required fullWidth label="Email Address" type="email"
                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <TextField
                            margin="normal" required fullWidth label="Password" type="password"
                            value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1, padding: 1.5, fontWeight: 'bold' }}>
                            Sign Up
                        </Button>
                        <Button fullWidth component={Link} to="/login" sx={{ mt: 1 }}>
                            Already have an account? Login
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;
