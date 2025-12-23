import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import PublicIcon from '@mui/icons-material/Public';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const WhySolar: React.FC = () => {
  const benefits = [
    {
      icon: <SavingsIcon sx={{ fontSize: 50 }} />,
      title: 'Reduce Electricity Bills',
      description: 'Save up to 70% on your monthly electricity bills. Solar panels generate free electricity for 25+ years, providing long-term savings.',
    },
    {
      icon: <PublicIcon sx={{ fontSize: 50 }} />,
      title: 'Environmental Impact',
      description: 'Reduce your carbon footprint by 80%. One solar installation can offset 100+ tons of CO2 over its lifetime.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 50 }} />,
      title: 'Increase Property Value',
      description: 'Homes with solar panels sell for 3-4% more on average. Solar is a smart investment that pays for itself.',
    },
    {
      icon: <ElectricBoltIcon sx={{ fontSize: 50 }} />,
      title: 'Energy Independence',
      description: 'Generate your own clean energy and reduce reliance on the grid. Protect yourself from rising electricity costs.',
    },
    {
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 50 }} />,
      title: 'Government Subsidies',
      description: 'Take advantage of government subsidies up to 40% for residential installations. Additional tax benefits available.',
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 50 }} />,
      title: 'Low Maintenance',
      description: 'Solar panels require minimal maintenance. Just occasional cleaning and they work efficiently for decades.',
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
            Why Choose Solar Energy?
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Discover the many benefits of switching to clean, renewable solar power
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 6,
          }}
        >
          {benefits.map((benefit, index) => (
            <Paper
              key={index}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6,
                },
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mb: 3,
                  background: 'linear-gradient(135deg, #ff9933, #138808)',
                }}
              >
                {benefit.icon}
              </Avatar>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                {benefit.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {benefit.description}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Paper
          sx={{
            p: 6,
            background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.1), rgba(19, 136, 8, 0.1))',
            border: '2px solid',
            borderColor: '#ff9933',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            The Time to Go Solar is Now
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            With electricity prices rising every year and the cost of solar panels decreasing,
            there has never been a better time to make the switch. The average solar system pays
            for itself in just 5-7 years, and continues to generate free electricity for 20+ more
            years.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Plus, with government subsidies and net metering policies, you can maximize your
            savings while contributing to a cleaner, greener future for India.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default WhySolar;
