import React from 'react';
import {
  TextField,
  Typography,
  Button,
  Box,
  Divider,
  Paper,
} from '@mui/material';
import { useForm } from '../../../../hooks/useForm';
import './Contact.css';

interface ContactFormData extends Record<string, string> {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { formData, handleChange, handleSubmit } = useForm<ContactFormData>(
    { name: '', email: '', message: '' },
    (data) => {
      alert(`Thanks ${data.name}, your message has been sent!`);
    }
  );

  return (
    <div className="contact-page-wrapper">
      <Box className="contact-page">
        <Paper elevation={3} className="contact-info">
          <Typography variant="h3" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hi — drop us a message.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box className="contact-about">
            <Typography variant="h5" gutterBottom>
              About This App
            </Typography>
            <Typography variant="body2">
              This app is for course Kerem! Here we will talk after the course ends and keep in touch!
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={3} component="form" onSubmit={handleSubmit} className="contact-form">
          <Typography variant="h4" gutterBottom>
            Have any questions?
          </Typography>

          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ alignSelf: 'flex-start', mt: 2 }}
          >
            Send Message
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default Contact;
