import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import BuildIcon from '@mui/icons-material/Build';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import BusinessIcon from '@mui/icons-material/Business';

const Services: React.FC = () => {
  const services = [
    {
      icon: <SolarPowerIcon sx={{ fontSize: 40 }} />,
      title: 'Solar Panel Installation',
      description: 'Professional installation of high-efficiency solar panels for residential and commercial properties. Complete end-to-end service with quality assurance.',
    },
    {
      icon: <HomeWorkIcon sx={{ fontSize: 40 }} />,
      title: 'Residential Solar Solutions',
      description: 'Customized solar solutions for homes of all sizes. Reduce your electricity bills and increase property value with our tailored residential packages.',
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      title: 'Commercial Solar Systems',
      description: 'Large-scale solar installations for businesses and industries. Maximize ROI with our commercial-grade solar systems designed for high energy demands.',
    },
    {
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
      title: 'Maintenance & Repair',
      description: '24/7 maintenance and repair services to ensure optimal performance. Regular cleaning, monitoring, and troubleshooting to keep your system running efficiently.',
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
      title: 'Energy Audits',
      description: 'Comprehensive energy audits to identify savings opportunities. We analyze your energy consumption and design the perfect solar solution for maximum savings.',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: 'Consultation & Support',
      description: 'Expert consultation to help you understand solar benefits and ROI. Ongoing customer support to answer all your questions and concerns.',
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
            Our Solar Solutions
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Comprehensive solar energy services tailored to your needs
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              sx={{
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
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 3,
                    background: 'linear-gradient(135deg, #ff9933, #138808)',
                  }}
                >
                  {service.icon}
                </Avatar>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
