import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BoltIcon from '@mui/icons-material/Bolt';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Residential Villa - Delhi',
      location: 'South Delhi',
      capacity: '5 kW',
      type: 'Residential',
      description: 'Complete rooftop solar installation for a luxury villa. System generates 600+ units per month, reducing electricity bills by 75%.',
      year: '2024',
    },
    {
      title: 'Manufacturing Plant - Gurgaon',
      location: 'Industrial Area, Gurgaon',
      capacity: '50 kW',
      type: 'Commercial',
      description: 'Large-scale solar installation for manufacturing facility. Helping reduce operational costs by ₹2L+ annually.',
      year: '2024',
    },
    {
      title: 'Apartment Complex - Noida',
      location: 'Sector 62, Noida',
      capacity: '25 kW',
      type: 'Residential',
      description: 'Community solar project for 40+ apartments. Shared solar benefits for entire residential complex.',
      year: '2023',
    },
    {
      title: 'Office Building - Bangalore',
      location: 'Whitefield, Bangalore',
      capacity: '30 kW',
      type: 'Commercial',
      description: 'Corporate solar installation with battery backup. 24/7 clean energy for modern office space.',
      year: '2023',
    },
    {
      title: 'Farmhouse - Jaipur',
      location: 'Outskirts of Jaipur',
      capacity: '10 kW',
      type: 'Residential',
      description: 'Off-grid solar solution for remote farmhouse. Complete energy independence with battery storage.',
      year: '2023',
    },
    {
      title: 'School Campus - Pune',
      location: 'Kothrud, Pune',
      capacity: '40 kW',
      type: 'Institutional',
      description: 'Educational institution going green. Powering classrooms and computer labs with solar energy.',
      year: '2022',
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
            Our Projects
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Explore our successful solar installations across India
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
          }}
        >
          {projects.map((project, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 0 }}>
                    {project.title}
                  </Typography>
                  <Chip
                    label={project.year}
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #ff9933, #138808)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {project.location}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <BoltIcon sx={{ fontSize: 20, color: '#ff9933' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#ff9933' }}>
                    {project.capacity} System
                  </Typography>
                  <Chip label={project.type} size="small" variant="outlined" />
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {project.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
