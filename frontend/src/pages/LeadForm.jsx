import { useState, useEffect } from 'react';
import {
    Typography,
    Paper,
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Grid
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const LeadForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'New',
        company: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const compRes = await api.get('/companies');
                setCompanies(compRes.data);

                if (isEditing) {
                    const leadRes = await api.get(`/leads/${id}`);
                    setFormData({
                        name: leadRes.data.name || '',
                        email: leadRes.data.email || '',
                        phone: leadRes.data.phone || '',
                        status: leadRes.data.status || 'New',
                        company: leadRes.data.company?._id || ''
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = { ...formData };
            if (!payload.company) delete payload.company;

            if (isEditing) {
                await api.put(`/leads/${id}`, payload);
            } else {
                await api.post('/leads', payload);
            }

            navigate('/leads');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Error saving lead');
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            <Button
                variant="text"
                onClick={() => navigate('/leads')}
                sx={{ mb: 2 }}
            >
                ← Back
            </Button>

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3
                }}
            >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                    {isEditing ? 'Edit Lead' : 'Create Lead'}
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>

                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                            />
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={formData.status}
                                    label="Status"
                                    onChange={(e) =>
                                        setFormData({ ...formData, status: e.target.value })
                                    }
                                >
                                    <MenuItem value="New">New</MenuItem>
                                    <MenuItem value="Contacted">Contacted</MenuItem>
                                    <MenuItem value="Lost">Lost</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Company</InputLabel>
                                <Select
                                    value={formData.company}
                                    label="Company"
                                    onChange={(e) =>
                                        setFormData({ ...formData, company: e.target.value })
                                    }
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {companies.map((c) => (
                                        <MenuItem key={c._id} value={c._id}>
                                            {c.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontWeight: 600
                                }}
                            >
                                {isEditing ? 'Update Lead' : 'Create Lead'}
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default LeadForm;