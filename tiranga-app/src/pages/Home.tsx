import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  alpha,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha('#ff9933', 0.9)}, ${alpha('#138808', 0.9)})`,
        color: 'white',
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0z" fill="none"/%3E%3Cpath d="M0 0h1v1H0zm10 10h1v1h-1z" fill="%23ffffff" fill-opacity="0.1"/%3E%3C/svg%3E")',
          opacity: 0.3,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 6,
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Power Your Future with Solar Energy
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 5,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
                opacity: 0.95,
                lineHeight: 1.6,
              }}
            >
              Join thousands of homeowners and businesses making the switch to clean,
              renewable energy. Save money while saving the planet.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: 'white',
                  color: '#ff9933',
                  px: 5,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'white',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Free Quote
              </Button>
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  borderWidth: 2,
                  color: 'white',
                  px: 5,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: 2,
                    bgcolor: alpha('#ffffff', 0.15),
                  },
                }}
              >
                View Plans
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SolarPowerIcon
              sx={{
                fontSize: { xs: 250, sm: 350, md: 400 },
                opacity: 0.9,
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': {
                    transform: 'translateY(0px)',
                  },
                  '50%': {
                    transform: 'translateY(-20px)',
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
