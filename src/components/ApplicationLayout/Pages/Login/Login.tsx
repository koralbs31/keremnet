import { useState } from 'react';
import axios from 'axios';
import { Box, Button, CssBaseline, FormControl, FormLabel, Stack, TextField, Typography, Card as MuiCard } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from '../../../../hooks/useForm';
import { ROUTES } from '../../../../Routes';
import { User } from '../../../../App';
import { useNavigate } from 'react-router-dom';

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
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  background: 'radial-gradient(ellipse at center, #f3f6f9 0%, #ffffff 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface Props {
  onLogin: (user: User) => void;
}

interface FormFields {
  email: string;
  password: string;
  [key: string]: string;
}


const Login: React.FC<Props> = ({ onLogin }) => {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  let navigate = useNavigate();

  const { formData, handleChange, handleSubmit } = useForm<FormFields>(
    { email: '', password: '' },
    async (data) => {
      if (!validateInputs(data)) return;

      try {
        const res = await axios.post(`${ROUTES.users}/login`, data);
        onLogin(res.data.user);
        navigate("/")
      } catch (err) {
        console.error('Login failed:', err);
      }
    }
  );

  const validateInputs = (data: FormFields) => {
    let isValid = true;
    if (!/\S+@\S+\.\S+/.test(data.email)) { setEmailError('Invalid email'); isValid = false; } else setEmailError('');
    if (data.password.length < 6) { setPasswordError('Password too short'); isValid = false; } else setPasswordError('');
    return isValid;
  };

  return (
    <>
      <CssBaseline />
      <SignInContainer>
        <Card variant="outlined">
          <Typography component="h1" variant="h4">Sign in</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField name="email" value={formData.email} onChange={handleChange} error={!!emailError} helperText={emailError} />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField type="password" name="password" value={formData.password} onChange={handleChange} error={!!passwordError} helperText={passwordError} />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">Sign in</Button>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
};

export default Login;
