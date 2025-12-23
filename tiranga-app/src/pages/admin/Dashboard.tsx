import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  qualifiedLeads: number;
  convertedLeads: number;
  conversionRate: number;
  recentEnquiries: any[];
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { admin, token, logout, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    fetchStats();
  }, [isAuthenticated, navigate]);

  const fetchStats = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await api.getDashboardStats(token);
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setLogoutDialogOpen(false);
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  const statCards = [
    {
      title: 'Total Enquiries',
      value: stats?.totalEnquiries || 0,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#ff9933',
    },
    {
      title: 'New Enquiries',
      value: stats?.newEnquiries || 0,
      icon: <NewReleasesIcon sx={{ fontSize: 40 }} />,
      color: '#2196f3',
    },
    {
      title: 'Qualified Leads',
      value: stats?.qualifiedLeads || 0,
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: '#4caf50',
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversionRate?.toFixed(1) || 0}%`,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: '#138808',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Top Navigation */}
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: 1 }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #ff9933, #138808)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Tiranga Solar - Admin Panel
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Welcome, {admin?.name}
          </Typography>
          <IconButton onClick={handleLogoutClick} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out? You will be redirected to the home page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #ff9933, #138808)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #ff9933, #138808)',
                opacity: 0.9,
              },
            }}
          >
            Yes, Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          Dashboard Overview
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Stats Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3,
            mb: 4,
          }}
        >
          {statCards.map((card, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 4,
                },
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  bgcolor: `${card.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <Box sx={{ color: card.color }}>{card.icon}</Box>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {card.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.title}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/admin/enquiries')}
            sx={{
              background: 'linear-gradient(135deg, #ff9933, #138808)',
              color: 'white',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #ff9933, #138808)',
                opacity: 0.9,
              },
            }}
          >
            View All Enquiries
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/admin/enquiries?status=new')}
          >
            View New Enquiries ({stats?.newEnquiries || 0})
          </Button>
        </Box>

        {/* Recent Enquiries */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Recent Enquiries
          </Typography>

          {stats?.recentEnquiries && stats.recentEnquiries.length > 0 ? (
            <Box>
              {stats.recentEnquiries.map((enquiry: any, index: number) => (
                <Box
                  key={enquiry._id || index}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    '&:last-child': { mb: 0 },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6">{enquiry.name}</Typography>
                    <Chip
                      label={enquiry.status}
                      size="small"
                      color={enquiry.status === 'new' ? 'primary' : 'default'}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {enquiry.email} • {enquiry.phone}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {enquiry.message}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    {new Date(enquiry.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography color="text.secondary">No recent enquiries</Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
