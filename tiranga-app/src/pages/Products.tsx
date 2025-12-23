import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Products: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      power: '3 kW',
      price: '₹1,80,000',
      features: [
        '3 kW Solar System',
        '12 Solar Panels',
        '15-Year Warranty',
        'Free Installation',
        'Basic Monitoring',
        'Annual Maintenance',
      ],
      popular: false,
    },
    {
      name: 'Premium',
      power: '5 kW',
      price: '₹2,75,000',
      features: [
        '5 kW Solar System',
        '20 High-Efficiency Panels',
        '25-Year Warranty',
        'Free Installation',
        'Advanced Monitoring App',
        'Priority Support',
        'Quarterly Maintenance',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      power: '10 kW',
      price: '₹5,00,000',
      features: [
        '10 kW Solar System',
        '40 Premium Panels',
        '25-Year Warranty',
        'Free Installation',
        'Real-Time Monitoring',
        '24/7 Premium Support',
        'Monthly Maintenance',
        'Battery Backup Option',
      ],
      popular: false,
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Solar Plans & Pricing
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Choose the perfect solar plan for your energy needs
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {plans.map((plan, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.popular ? '3px solid #ff9933' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 8,
                },
              }}
            >
              {plan.popular && (
                <Chip
                  label="MOST POPULAR"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'linear-gradient(135deg, #ff9933, #138808)',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ff9933, #138808)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {plan.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                  {plan.power} System
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {plan.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  One-time investment
                </Typography>

                <Stack spacing={2} sx={{ mb: 4 }}>
                  {plan.features.map((feature, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#138808', fontSize: 20 }} />
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Button
                  component={Link}
                  to="/contact"
                  variant={plan.popular ? 'contained' : 'outlined'}
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    ...(plan.popular && {
                      background: 'linear-gradient(135deg, #ff9933, #138808)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #ff9933, #138808)',
                        opacity: 0.9,
                      },
                    }),
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Products;
