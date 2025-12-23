import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
} from '@mui/material';

const PrivacyPolicy: React.FC = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Privacy Policy
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Last updated: December 20, 2025
          </Typography>
        </Box>

        <Paper sx={{ p: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Legal Jargon and Privacy Stuff
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            <em>
              [This is a placeholder privacy policy page. Replace with actual legal content.]
            </em>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Legal jargon about collecting your name, email, phone number, address, and other
            personal information when you use our services or contact us. Blah blah cookies,
            tracking pixels, and other magical internet things.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            More legal jargon about using your data to provide services, process orders, send
            you marketing emails (that you can unsubscribe from), improve our website, and
            generally run our business. Standard stuff.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            3. Data Protection
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Fancy words about how we protect your data with encryption, secure servers, and
            other technical security measures. We promise we're not selling your data to
            random people on the internet.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            4. Third-Party Services
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Legal speak about how we might use third-party services like Google Analytics,
            payment processors, and other tools. They have their own privacy policies too.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            5. Cookies and Tracking
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            The obligatory section about cookies (not the delicious kind). We use them to
            remember your preferences, analyze site traffic, and make the website work better.
            You can disable them in your browser if you want.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            6. Your Rights
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Legal stuff about your rights to access, update, or delete your personal data.
            You can also opt-out of marketing communications. Just email us and we'll sort it out.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            7. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            We might update this policy occasionally. When we do, we'll update the date at the
            top. Keep checking back if you're really into reading privacy policies.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            8. Contact Us
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            If you have questions about this privacy policy or how we handle your data, reach
            out to us at privacy@tirangasolar.com or through our contact page.
          </Typography>

          <Box
            sx={{
              mt: 6,
              p: 3,
              bgcolor: 'grey.100',
              borderRadius: 2,
              borderLeft: 4,
              borderColor: '#ff9933',
            }}
          >
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              <strong>Note:</strong> This is example placeholder content. In a real website,
              you would need to consult with a legal professional to create a proper privacy
              policy that complies with applicable laws like GDPR, CCPA, and Indian data
              protection regulations.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
