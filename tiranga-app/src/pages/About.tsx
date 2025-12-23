import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HandshakeIcon from '@mui/icons-material/Handshake';

const About: React.FC = () => {
  const values = [
    {
      icon: <GroupsIcon sx={{ fontSize: 50 }} />,
      title: 'Customer First',
      description: 'We prioritize our customers needs and satisfaction above all else.',
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 50 }} />,
      title: 'Excellence',
      description: 'We strive for excellence in every solar installation we deliver.',
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 50 }} />,
      title: 'Integrity',
      description: 'We operate with transparency and honesty in all our dealings.',
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            About Tiranga Solar
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Leading the solar revolution in India with sustainable energy solutions
          </Typography>
        </Box>

        <Paper sx={{ p: 6, mb: 6 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Our Story
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Founded in 2010, Tiranga Solar has been at the forefront of India's renewable energy
            revolution. We started with a simple mission: to make clean, affordable solar energy
            accessible to every home and business across the nation.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Over the past 15 years, we've installed over 5MW of solar capacity, helping thousands
            of customers reduce their carbon footprint while saving on energy costs. Our commitment
            to quality, innovation, and customer satisfaction has made us one of India's most
            trusted solar energy providers.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
            Today, we continue to push the boundaries of solar technology, offering cutting-edge
            solutions that combine efficiency, reliability, and affordability. Join us in building
            a sustainable future for generations to come.
          </Typography>
        </Paper>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Our Values
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {values.map((value, index) => (
            <Paper
              key={index}
              sx={{
                p: 4,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 3,
                  background: 'linear-gradient(135deg, #ff9933, #138808)',
                }}
              >
                {value.icon}
              </Avatar>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {value.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {value.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default About;
