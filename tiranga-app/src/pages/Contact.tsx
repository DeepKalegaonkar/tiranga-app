import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import api from '../services/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    serviceType: 'residential',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate reCAPTCHA
    if (!captchaValue) {
      setError('Please complete the reCAPTCHA verification');
      setLoading(false);
      return;
    }

    try {
      // Send to backend API
      await api.submitEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        serviceType: formData.serviceType,
        message: formData.message,
        source: 'website',
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', city: '', state: '', serviceType: 'residential', message: '' });
      setCaptchaValue(null);
      recaptchaRef.current?.reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 98765 43211'],
    },
    {
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      title: 'Email Us',
      details: ['info@tirangasolar.com', 'support@tirangasolar.com'],
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
      title: 'Visit Us',
      details: ['123 Solar Street', 'Green Energy Complex', 'New Delhi - 110001'],
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
      title: 'Business Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', 'Sunday: Closed'],
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
            Contact Us
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Get in touch with our solar experts. We're here to help!
          </Typography>
        </Box>

        {/* Contact Info Cards - Horizontal Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3,
            mb: 6,
          }}
        >
          {contactInfo.map((info, index) => (
            <Paper
              key={index}
              sx={{
                p: 3,
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 60,
                  height: 60,
                  mx: 'auto',
                  mb: 2,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff9933, #138808)',
                  color: 'white',
                }}
              >
                {info.icon}
              </Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                {info.title}
              </Typography>
              {info.details.map((detail, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '0.875rem' }}
                >
                  {detail}
                </Typography>
              ))}
            </Paper>
          ))}
        </Box>

        {/* Contact Form - Centered and Compact */}
        <Box sx={{ maxWidth: 700, mx: 'auto' }}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
              Send us a Message
            </Typography>

            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you! Your message has been sent successfully. We'll get back to you soon!
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  size="small"
                />

                <TextField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  size="small"
                />
              </Box>

              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: 2 }}
              />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  size="small"
                />

                <TextField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  size="small"
                />
              </Box>

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Service Type</InputLabel>
                <Select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  label="Service Type"
                  required
                >
                  <MenuItem value="residential">Residential Solar</MenuItem>
                  <MenuItem value="commercial">Commercial Solar</MenuItem>
                  <MenuItem value="industrial">Industrial Solar</MenuItem>
                  <MenuItem value="consultation">Consultation</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Your Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: 3 }}
              />

              {/* reCAPTCHA */}
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #ff9933, #138808)',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff9933, #138808)',
                    opacity: 0.9,
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #ff9933, #138808)',
                    opacity: 0.6,
                  },
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
