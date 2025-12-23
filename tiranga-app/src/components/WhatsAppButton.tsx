import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '919876543210', // Default number - replace with actual
  message = 'Hi! I am interested in solar solutions.',
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Tooltip title="Chat with us on WhatsApp" placement="left">
      <Fab
        color="success"
        aria-label="whatsapp"
        onClick={handleWhatsAppClick}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: '#25D366',
          '&:hover': {
            bgcolor: '#128C7E',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
          zIndex: 1000,
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 32 }} />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppButton;
