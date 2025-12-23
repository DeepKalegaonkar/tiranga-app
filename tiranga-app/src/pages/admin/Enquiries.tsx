import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Collapse,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import RefreshIcon from '@mui/icons-material/Refresh';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const AdminEnquiries: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { admin, token, logout, isAuthenticated } = useAuth();

  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Filters
  const [filters, setFilters] = useState({
    status: searchParams.get('status') || '',
    search: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchEnquiries();
  }, [isAuthenticated, navigate, page, rowsPerPage, filters]);

  const fetchEnquiries = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await api.getEnquiries(token, {
        page: page + 1,
        limit: rowsPerPage,
        ...( filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      });

      if (response.success) {
        // Backend returns data as direct array in response.data
        setEnquiries(response.data || []);
        // Total count is at the top level of response
        setTotalCount((response as any).total || 0);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!token) return;

    try {
      const blob = await api.exportEnquiries(token, filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `enquiries_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      setError('Failed to export enquiries');
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

  const handleStatusChange = async (enquiryId: string, newStatus: string) => {
    if (!token) return;

    try {
      await api.updateEnquiry(token, enquiryId, { status: newStatus });
      // Refresh the enquiries list
      fetchEnquiries();
    } catch (err: any) {
      setError('Failed to update enquiry status');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      new: 'primary',
      contacted: 'info',
      qualified: 'warning',
      converted: 'success',
      rejected: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
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
            Tiranga Solar - Enquiries
          </Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin/dashboard')}
            sx={{
              mr: 2,
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Go Back
          </Button>
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

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Manage Enquiries
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchEnquiries}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              sx={{
                background: 'linear-gradient(135deg, #ff9933, #138808)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ff9933, #138808)',
                  opacity: 0.9,
                },
              }}
            >
              Export to Excel
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
            <TextField
              label="Search"
              placeholder="Name, email, phone..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              size="small"
            />
            <FormControl size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="contacted">Contacted</MenuItem>
                <MenuItem value="qualified">Qualified</MenuItem>
                <MenuItem value="converted">Converted</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={fetchEnquiries}>
              Apply Filters
            </Button>
          </Box>
        </Paper>

        {/* Table */}
        <TableContainer component={Paper}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width={50} />
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Phone</strong></TableCell>
                    <TableCell><strong>Message</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enquiries.length > 0 ? (
                    enquiries.map((enquiry) => (
                      <React.Fragment key={enquiry._id}>
                        <TableRow hover sx={{ cursor: 'pointer' }}>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => setExpandedRow(expandedRow === enquiry._id ? null : enquiry._id)}
                            >
                              {expandedRow === enquiry._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell onClick={() => setExpandedRow(expandedRow === enquiry._id ? null : enquiry._id)}>
                            {enquiry.name}
                          </TableCell>
                          <TableCell onClick={() => setExpandedRow(expandedRow === enquiry._id ? null : enquiry._id)}>
                            {enquiry.email}
                          </TableCell>
                          <TableCell onClick={() => setExpandedRow(expandedRow === enquiry._id ? null : enquiry._id)}>
                            {enquiry.phone}
                          </TableCell>
                          <TableCell onClick={() => setExpandedRow(expandedRow === enquiry._id ? null : enquiry._id)} sx={{ maxWidth: 300 }}>
                            {enquiry.message.length > 50
                              ? enquiry.message.substring(0, 50) + '...'
                              : enquiry.message}
                          </TableCell>
                          <TableCell onClick={() => setExpandedRow(expandedRow === enquiry._id ? null : enquiry._id)}>
                            <Chip
                              label={enquiry.status}
                              color={getStatusColor(enquiry.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell onClick={() => setExpandedRow(expandedRow === enquiry._id ? null : enquiry._id)}>
                            {new Date(enquiry.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                            <Collapse in={expandedRow === enquiry._id} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 2, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                  Full Details
                                </Typography>

                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">Name</Typography>
                                    <Typography variant="body1">{enquiry.name}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">Email</Typography>
                                    <Typography variant="body1">{enquiry.email}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">Phone</Typography>
                                    <Typography variant="body1">{enquiry.phone}</Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="caption" color="text.secondary">Date</Typography>
                                    <Typography variant="body1">
                                      {new Date(enquiry.createdAt).toLocaleString()}
                                    </Typography>
                                  </Box>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                  <Typography variant="caption" color="text.secondary">Full Message</Typography>
                                  <Paper sx={{ p: 2, mt: 1, bgcolor: 'white' }}>
                                    <Typography variant="body1">{enquiry.message}</Typography>
                                  </Paper>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                  <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                      Change Status
                                    </Typography>
                                    <FormControl size="small" sx={{ minWidth: 200 }}>
                                      <InputLabel>Status</InputLabel>
                                      <Select
                                        value={enquiry.status}
                                        onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                                        label="Status"
                                      >
                                        <MenuItem value="new">New</MenuItem>
                                        <MenuItem value="contacted">Contacted</MenuItem>
                                        <MenuItem value="qualified">Qualified</MenuItem>
                                        <MenuItem value="converted">Converted</MenuItem>
                                        <MenuItem value="rejected">Rejected</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>

                                  <Box sx={{ display: 'flex', gap: 2 }}>
                                    {enquiry.status === 'new' && (
                                      <Button
                                        variant="outlined"
                                        onClick={() => handleStatusChange(enquiry._id, 'contacted')}
                                      >
                                        Mark as Contacted
                                      </Button>
                                    )}
                                    {(enquiry.status === 'new' || enquiry.status === 'contacted') && (
                                      <Button
                                        variant="contained"
                                        onClick={() => handleStatusChange(enquiry._id, 'qualified')}
                                        sx={{
                                          background: 'linear-gradient(135deg, #ff9933, #138808)',
                                          color: 'white',
                                          '&:hover': {
                                            background: 'linear-gradient(135deg, #ff9933, #138808)',
                                            opacity: 0.9,
                                          },
                                        }}
                                      >
                                        Mark as Qualified
                                      </Button>
                                    )}
                                    {enquiry.status === 'qualified' && (
                                      <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleStatusChange(enquiry._id, 'converted')}
                                      >
                                        Mark as Converted
                                      </Button>
                                    )}
                                  </Box>
                                </Box>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No enquiries found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                count={totalCount}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </>
          )}
        </TableContainer>
      </Container>
    </Box>
  );
};

export default AdminEnquiries;
