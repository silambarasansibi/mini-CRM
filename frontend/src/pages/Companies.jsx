import { useState, useEffect } from 'react';
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        industry: '',
        location: ''
    });

    const fetchCompanies = async () => {
        try {
            const { data } = await api.get('/companies');
            setCompanies(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleSubmit = async () => {
        try {
            await api.post('/companies', formData);
            setOpen(false);
            setFormData({ name: '', industry: '', location: '' });
            fetchCompanies();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Companies
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    sx={{ px: 3 }}
                >
                    + Add Company
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Industry</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {companies.map((company) => (
                            <TableRow
                                key={company._id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#fafafa'
                                    }
                                }}
                            >
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.industry}</TableCell>
                                <TableCell>{company.location}</TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        component={Link}
                                        to={`/companies/${company._id}`}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ fontWeight: 600 }}>
                    Add New Company
                </DialogTitle>

                <DialogContent sx={{ pt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Company Name"
                            fullWidth
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />

                        <TextField
                            label="Industry"
                            fullWidth
                            value={formData.industry}
                            onChange={(e) =>
                                setFormData({ ...formData, industry: e.target.value })
                            }
                        />

                        <TextField
                            label="Location"
                            fullWidth
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({ ...formData, location: e.target.value })
                            }
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!formData.name}
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Companies;