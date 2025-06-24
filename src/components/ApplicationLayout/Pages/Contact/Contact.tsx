import React from 'react';
import { TextField, Typography, Button, Box } from '@mui/material';
import { useForm } from '../../../../hooks/useForm';
import './Contact.css';

const Contact: React.FC = () => {
  const { formData, handleChange, handleSubmit } = useForm(
    { name: '', email: '', message: '' },
    (data) => {
      alert(`Thanks ${data.name}, your message has been sent!`);
    }
  );

  return (
    <div className="contact-page-wrapper">
      <Box className="contact-page" sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box className="contact-info">
          <Typography variant="h3">Contact Us</Typography>
          <Typography>
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hi — drop us a message.
          </Typography>
          <Box className="contact-about" sx={{ mt: 3 }}>
            <Typography variant="h5">About This App</Typography>
            <Typography>
              This app is for course Kerem! Here we will talk after the course ends and will keep in touch!
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit} className="contact-form">
          <Typography variant="h4">Have any question?</Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />

          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Send Message
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Contact;