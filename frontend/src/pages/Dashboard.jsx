import { useState, useEffect } from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { People, Assignment, CheckCircle, ThumbUp } from '@mui/icons-material';
import api from '../api/axios';

const DashboardCard = ({ title, value, icon, color }) => (
    <Paper
        elevation={3}
        sx={{
            p: 3,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0px 10px 25px rgba(0,0,0,0.12)'
            }
        }}
    >
        <Box>
            <Typography
                variant="subtitle2"
                sx={{ color: 'text.secondary', fontWeight: 600 }}
            >
                {title}
            </Typography>

            <Typography
                variant="h4"
                sx={{ fontWeight: 700, mt: 1 }}
            >
                {value}
            </Typography>
        </Box>

        <Box
            sx={{
                width: 60,
                height: 60,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: `${color}15`,
                color: color
            }}
        >
            {icon}
        </Box>
    </Paper>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalLeads: 0,
        qualifiedLeads: 0,
        tasksDueToday: 0,
        completedTasks: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/dashboard');
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography
                variant="h4"
                sx={{ mb: 4, fontWeight: 700 }}
            >
                Dashboard Overview
            </Typography>

            <Grid container spacing={3}>
                <Grid xs={12} sm={6} md={3}>
                    <DashboardCard
                        title="Total Leads"
                        value={stats.totalLeads}
                        icon={<People />}
                        color="#1976d2"
                    />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <DashboardCard
                        title="Qualified Leads"
                        value={stats.qualifiedLeads}
                        icon={<ThumbUp />}
                        color="#2e7d32"
                    />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <DashboardCard
                        title="Tasks Due Today"
                        value={stats.tasksDueToday}
                        icon={<Assignment />}
                        color="#ed6c02"
                    />
                </Grid>

                <Grid xs={12} sm={6} md={3}>
                    <DashboardCard
                        title="Completed Tasks"
                        value={stats.completedTasks}
                        icon={<CheckCircle />}
                        color="#9c27b0"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;