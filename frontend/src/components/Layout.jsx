import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar
} from '@mui/material';
import { Dashboard, People, Business, Assignment } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const drawerWidth = 260;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Leads', icon: <People />, path: '/leads' },
    { text: 'Companies', icon: <Business />, path: '/companies' },
    { text: 'Tasks', icon: <Assignment />, path: '/tasks' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" noWrap className="gradient-text">
            Mini CRM
          </Typography>

          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: '#4facfe', width: 32, height: 32 }}>
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography sx={{ fontWeight: 500 }}>
                  {user.name}
                </Typography>
              </Box>

              <Button variant="outlined" onClick={logout} size="small">
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />

        <Box sx={{ mt: 3 }}>
          <List sx={{ px: 2 }}>
            {menuItems.map((item) => {
              const active =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      mb: 1,
                      borderRadius: 3,
                      backgroundColor: active
                        ? 'rgba(79, 172, 254, 0.15)'
                        : 'transparent',
                      color: active ? '#4facfe' : '#4a5568',
                      '&:hover': {
                        backgroundColor: active
                          ? 'rgba(79, 172, 254, 0.2)'
                          : 'rgba(0,0,0,0.04)'
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: active ? '#4facfe' : '#718096',
                        minWidth: 40
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: active ? 600 : 500 }}>
                          {item.text}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;