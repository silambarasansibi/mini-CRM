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
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const navigate = useNavigate();

    const fetchLeads = async () => {
        try {
            const { data } = await api.get(`/leads?page=${page}&limit=5&search=${search}&status=${statusFilter}`);
            setLeads(data.leads || []);
            setTotalPages(data.pages || 1);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page, search, statusFilter]);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this lead?')) {
            try {
                await api.delete(`/leads/${id}`);
                fetchLeads();
            } catch (error) {
                console.error(error);
            }
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
                    Leads
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate('/leads/new')}
                    sx={{ px: 3 }}
                >
                    + Add Lead
                </Button>
            </Box>

            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <TextField
                        label="Search name or email"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ minWidth: 220 }}
                    />

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={statusFilter}
                            label="Status"
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem value="Contacted">Contacted</MenuItem>
                            <MenuItem value="Lost">Lost</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>

            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {leads.map((lead) => (
                            <TableRow
                                key={lead._id}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#fafafa'
                                    }
                                }}
                            >
                                <TableCell>{lead.name}</TableCell>
                                <TableCell>{lead.email}</TableCell>
                                <TableCell>{lead.company?.name || 'N/A'}</TableCell>
                                <TableCell>{lead.status}</TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        onClick={() => navigate(`/leads/edit/${lead._id}`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(lead._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {leads.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No leads found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, val) => setPage(val)}
                />
            </Box>
        </Box>
    );
};

export default Leads;