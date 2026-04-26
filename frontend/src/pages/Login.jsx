import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (!res.success) {
            setError(res.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
            <Box className="glass-panel" sx={{ p: 5, width: '100%', mt: -10 }}>
                <Typography component="h1" variant="h4" sx={{ mb: 4, textAlign: 'center' }} className="gradient-text">
                    Mini CRM
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal" required fullWidth
                        label="Email Address" autoFocus
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal" required fullWidth
                        label="Password" type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit" fullWidth variant="contained"
                        sx={{ mt: 4, mb: 2, py: 1.5, fontSize: '1rem' }}
                    >
                        Sign In
                    </Button>
                    <Button
                        fullWidth component={Link} to="/register"
                        sx={{ mt: 1, color: '#4facfe' }} variant="outlined"
                    >
                        Don't have an account? Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
