import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      title: '2024 Solar Subsidy Update: Everything You Need to Know',
      excerpt: 'The government has announced new subsidies for residential solar installations. Learn how you can save up to 40% on your solar investment...',
      date: 'December 15, 2024',
      category: 'Policy Updates',
      readTime: '5 min read',
    },
    {
      title: 'Top 5 Solar Panel Brands in India for 2024',
      excerpt: 'Choosing the right solar panel brand is crucial for long-term performance. We review the top manufacturers available in the Indian market...',
      date: 'December 10, 2024',
      category: 'Product Reviews',
      readTime: '7 min read',
    },
    {
      title: 'How Net Metering Works: A Complete Guide',
      excerpt: 'Net metering allows you to sell excess solar power back to the grid. Understand how it works and how much you can save with this comprehensive guide...',
      date: 'December 5, 2024',
      category: 'Education',
      readTime: '6 min read',
    },
    {
      title: 'Solar Installation: Step-by-Step Process',
      excerpt: 'From site survey to commissioning, understand every step of the solar installation process. Know what to expect when you go solar...',
      date: 'November 28, 2024',
      category: 'Installation',
      readTime: '8 min read',
    },
    {
      title: 'Monsoon and Solar Panels: What You Should Know',
      excerpt: 'Do solar panels work during monsoon? How to maintain them in the rainy season? Get all your monsoon-related solar questions answered...',
      date: 'November 20, 2024',
      category: 'Maintenance',
      readTime: '4 min read',
    },
    {
      title: 'ROI Calculator: When Will Your Solar System Pay Off?',
      excerpt: 'Calculate the return on investment for your solar installation. Understand payback periods, savings projections, and lifetime value...',
      date: 'November 15, 2024',
      category: 'Finance',
      readTime: '6 min read',
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
            Solar Energy Blog
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Latest news, tips, and insights about solar energy
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
          }}
        >
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={post.category}
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #ff9933, #138808)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  {post.title}
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                  {post.excerpt}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pt: 2,
                    borderTop: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {post.date}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {post.readTime}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      color: '#ff9933',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'transparent',
                        transform: 'translateX(4px)',
                      },
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    Read More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Blog;
