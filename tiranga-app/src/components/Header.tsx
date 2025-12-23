import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Container,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const servicesOpen = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleServicesClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleServicesClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
    setAnchorEl(null);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Why Solar', path: '/why-solar' },
    { label: 'Projects', path: '/projects' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Blog', path: '/blog' },
  ];

  const servicesItems = [
    { label: 'All Services', path: '/services' },
    { label: 'Solar Plans', path: '/products' },
  ];

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            background: 'linear-gradient(135deg, #ff9933, #138808)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
          }}
        >
          Tiranga Solar
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleMobileMenuClose}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton onClick={handleServicesClick}>
            <ListItemText primary="Our Solutions" />
            <ExpandMoreIcon
              sx={{
                transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            />
          </ListItemButton>
        </ListItem>

        {servicesOpen && (
          <Box sx={{ pl: 3, bgcolor: 'grey.50' }}>
            {servicesItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleMobileMenuClose}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        )}

        <Divider sx={{ my: 1 }} />

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/contact"
            onClick={handleMobileMenuClose}
            sx={{
              background: 'linear-gradient(135deg, #ff9933, #138808)',
              color: 'white',
              m: 1,
              borderRadius: 1,
              '&:hover': {
                background: 'linear-gradient(135deg, #ff9933, #138808)',
                opacity: 0.9,
              },
            }}
          >
            <ListItemText primary="Contact Us" />
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/admin/login"
            onClick={handleMobileMenuClose}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            <AdminPanelSettingsIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            <ListItemText primary="Admin Login" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'white',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #ff9933, #138808)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              Tiranga Solar
            </Typography>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      '&:hover': {
                        color: '#ff9933',
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}

                {/* Services Dropdown */}
                <Button
                  onClick={handleServicesClick}
                  endIcon={
                    <ExpandMoreIcon
                      sx={{
                        transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s',
                      }}
                    />
                  }
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': {
                      color: '#ff9933',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  Our Solutions
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={servicesOpen}
                  onClose={handleServicesClose}
                  MenuListProps={{
                    'aria-labelledby': 'services-button',
                  }}
                  sx={{
                    '& .MuiPaper-root': {
                      mt: 1,
                      minWidth: 180,
                    },
                  }}
                >
                  {servicesItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      component={Link}
                      to={item.path}
                      onClick={handleServicesClose}
                      sx={{
                        '&:hover': {
                          color: '#ff9933',
                        },
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>

                {/* Contact CTA */}
                <Button
                  component={Link}
                  to="/contact"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #ff9933, #138808)',
                    color: 'white',
                    fontWeight: 600,
                    px: 3,
                    borderRadius: 1,
                    boxShadow: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff9933, #138808)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(255, 153, 51, 0.3)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>

        {/* Utility Links Bar */}
        <Box
          sx={{
            bgcolor: 'grey.50',
            borderTop: 1,
            borderColor: 'divider',
            py: 0.5,
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                alignItems: 'center',
                fontSize: '0.85rem',
              }}
            >
              <Button
                component={Link}
                to="/privacy-policy"
                size="small"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#ff9933',
                    bgcolor: 'transparent',
                  },
                }}
              >
                Privacy Policy
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button
                component={Link}
                to="/terms"
                size="small"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#ff9933',
                    bgcolor: 'transparent',
                  },
                }}
              >
                Terms & Conditions
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button
                component={Link}
                to="/admin/login"
                size="small"
                startIcon={<AdminPanelSettingsIcon sx={{ fontSize: '1rem' }} />}
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#138808',
                    bgcolor: 'transparent',
                  },
                }}
              >
                Admin
              </Button>
            </Box>
          </Container>
        </Box>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
