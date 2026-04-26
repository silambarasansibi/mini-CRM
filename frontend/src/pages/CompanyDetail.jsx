import { useState, useEffect } from 'react';
import { Typography, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CompanyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchCompanyDetail = async () => {
            try {
                const response = await api.get(`/companies/${id}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching company details", error);
            }
        };
        fetchCompanyDetail();
    }, [id]);

    if (!data) return <Typography>Loading...</Typography>;

    return (
        <Box>
            <Button variant="outlined" onClick={() => navigate('/companies')} sx={{ mb: 3 }}>Back to Companies</Button>

            <Box className="glass-panel hover-lift" sx={{ p: 4, mb: 4, borderRadius: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#1a1a24' }}>{data.company.name}</Typography>
                <Typography variant="body1"><strong>Industry:</strong> {data.company.industry || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Location:</strong> {data.company.location || 'N/A'}</Typography>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Associated Leads</Typography>
            {data.leads.length === 0 ? (
                <Typography>No active leads found for this company.</Typography>
            ) : (
                <TableContainer component={Box} className="glass-panel" sx={{ p: 1 }}>
                    <Table>
                        <TableHead sx={{ '& th': { borderBottom: '1px solid rgba(0,0,0,0.05)', fontWeight: 700 } }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Assigned To</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.leads.map((lead) => (
                                <TableRow key={lead._id} className="table-row-animate">
                                    <TableCell>{lead.name}</TableCell>
                                    <TableCell>{lead.email}</TableCell>
                                    <TableCell>{lead.status}</TableCell>
                                    <TableCell>{lead.assignedTo?.name || 'Unassigned'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default CompanyDetail;
