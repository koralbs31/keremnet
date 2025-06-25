import React, { useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
  Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from '../../../../hooks/useForm'; 

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    '0px 5px 15px rgba(0, 0, 0, 0.05), 0px 15px 35px -5px rgba(0, 0, 0, 0.05)',
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  background:
    'radial-gradient(ellipse at center, #f3f6f9 0%, #ffffff 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface FormFields {
  username: string;
  email: string;
  password: string;
  [key: string]: string; 
}

export default function Register() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { formData, handleChange, handleSubmit } = useForm<FormFields>(
    { username: '', email: '', password: '' },
    (data) => {
      const isValid = validateInputs(data);
      if (!isValid) return;

      console.log('Form submitted:', data);
    }
  );

  const validateInputs = (data: FormFields) => {
    let isValid = true;

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!data.password || data.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline />
      <RegisterContainer>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
          >
            <FormControl>
                <FormLabel>Username</FormLabel>
                <TextField
                    margin="normal"
                    name="name"
                    value={formData.name}
                    placeholder='Type your username'
                    onChange={handleChange}
                    autoFocus
                    fullWidth
                    variant="outlined"
                    required
                />
            </FormControl>


            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                error={Boolean(emailError)}
                helperText={emailError}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
          </Box>
        </Card>
      </RegisterContainer>
    </>
  );
}