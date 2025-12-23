import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
} from '@mui/material';

const Terms: React.FC = () => {
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
            Terms & Conditions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Last updated: December 20, 2025
          </Typography>
        </Box>

        <Paper sx={{ p: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Legal Jargon and Terms Stuff
          </Typography>

          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            <em>
              [This is a placeholder terms and conditions page. Replace with actual legal content.]
            </em>
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            By using our website and services, you agree to these terms. If you don't agree,
            please don't use our services. Standard legal disclaimer that nobody reads but
            everyone should.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            2. Services and Products
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Legal talk about our solar installation services, products we offer, warranties,
            and what you can expect. We reserve the right to modify our services at any time
            because things change and we need flexibility.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            3. Pricing and Payment
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Boring but important stuff about pricing, payment terms, refunds, and billing.
            All prices are in Indian Rupees unless stated otherwise. Prices may change
            without notice (but we'll try to tell you first).
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            4. Installation and Service Terms
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Legal verbiage about installation timelines, site requirements, customer
            responsibilities, and what happens if things go wrong. We'll do our best to
            install on time, but delays can happen.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            5. Warranties and Guarantees
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Details about product warranties, performance guarantees, and what's covered
            (and what's not). Solar panels come with manufacturer warranties. Installation
            work has our own warranty. Read the fine print.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            6. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            The section where we limit our liability for various scenarios. We're not
            responsible for acts of God, weather damage, or things beyond our control.
            Standard legal protection stuff that all businesses need.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            7. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Legal words about how all content on this website belongs to us. Don't copy our
            stuff without permission. Trademarks, logos, and content are protected by law.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            8. Termination
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Conditions under which we can terminate services or your account. Also covers
            how you can cancel services. Both parties need an exit strategy.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            9. Dispute Resolution
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            Legal framework for handling disputes. We prefer to resolve issues amicably,
            but if it goes to court, jurisdiction will be New Delhi, India. Arbitration
            clauses and other dispute resolution mechanisms.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            10. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            We can update these terms whenever we want. We'll post changes here and update
            the date. Continued use means you accept the new terms. Check back periodically.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            11. Governing Law
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
            These terms are governed by Indian law. Any legal stuff will be handled in
            Indian courts. Standard jurisdiction clause.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
            12. Contact Information
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Questions about these terms? Contact us at legal@tirangasolar.com or through
            our contact page. We're here to help clarify anything.
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
              <strong>Note:</strong> This is example placeholder content written in a casual,
              easy-to-understand manner. In a real website, you must consult with a qualified
              lawyer to create proper terms and conditions that comply with Indian contract
              law and provide adequate legal protection for your business.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Terms;
