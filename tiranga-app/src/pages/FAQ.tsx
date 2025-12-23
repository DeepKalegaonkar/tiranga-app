import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: 'How much does a solar installation cost?',
      answer: 'The cost varies based on system size and requirements. A typical residential 3kW system starts at ₹1,80,000, while a 5kW system costs around ₹2,75,000. We offer flexible payment plans and help you access government subsidies to reduce costs.',
    },
    {
      question: 'How long do solar panels last?',
      answer: 'Solar panels typically last 25-30 years with minimal maintenance. Most panels come with a 25-year performance warranty, guaranteeing at least 80% efficiency after 25 years. The inverter may need replacement after 10-15 years.',
    },
    {
      question: 'What government subsidies are available?',
      answer: 'The Indian government offers subsidies up to 40% for residential rooftop solar installations under the PM Surya Ghar scheme. For systems up to 3kW, you can get ₹18,000 per kW subsidy. We help you with all subsidy applications.',
    },
    {
      question: 'How much can I save on electricity bills?',
      answer: 'On average, customers save 50-70% on their monthly electricity bills. A 5kW system can save ₹5,000-8,000 per month depending on your usage and location. The system typically pays for itself in 5-7 years.',
    },
    {
      question: 'What happens during cloudy days or at night?',
      answer: 'Solar panels work during cloudy days but at reduced efficiency (10-25%). At night, you can use stored energy if you have batteries, or draw power from the grid. With net metering, excess energy generated during the day offsets nighttime consumption.',
    },
    {
      question: 'How much roof space do I need?',
      answer: 'A 1kW system requires approximately 100 sq ft of shadow-free roof space. So for a 5kW system, you need about 500 sq ft. We conduct a site survey to determine the optimal panel placement for maximum efficiency.',
    },
    {
      question: 'Do solar panels require maintenance?',
      answer: 'Solar panels require minimal maintenance. We recommend cleaning them 2-4 times per year to remove dust and debris. Our maintenance packages include regular cleaning, performance monitoring, and annual inspections.',
    },
    {
      question: 'What is net metering?',
      answer: 'Net metering allows you to export excess solar energy to the grid and receive credits on your electricity bill. When your panels produce more than you consume, the surplus goes to the grid. You can use these credits when you need grid power.',
    },
    {
      question: 'Can I go completely off-grid?',
      answer: 'Yes, with a battery storage system you can go completely off-grid. However, staying grid-connected with net metering is usually more cost-effective. Off-grid systems require larger battery banks and have higher upfront costs.',
    },
    {
      question: 'How long does installation take?',
      answer: 'Installation typically takes 2-3 days for residential systems. The entire process from site survey to commissioning takes 4-6 weeks, including paperwork, approvals, and net metering setup.',
    },
  ];

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
            Frequently Asked Questions
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Find answers to common questions about solar energy
          </Typography>
        </Box>

        <Box>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
                '&:before': {
                  display: 'none',
                },
                boxShadow: 2,
                '&.Mui-expanded': {
                  boxShadow: 4,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    my: 2,
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
