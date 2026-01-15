import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from '../../../../hooks/AuthForm';
import { User } from '../../../../App';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../Routes';
import AppSnackbar from '../../../../Modals/AppSnackbar';

interface Props {
  onLogin: (user: User) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const navigate = useNavigate();

  const fields = [
    { name: 'email', label: 'Email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const validate = (data: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Invalid email';
    if (data.password.length < 6) errors.password = 'Password too short';
    return errors;
  };

  const onSubmit = async (data: Record<string, string>) => {
    try {
      const res = await axios.post(`${ROUTES.users}/login`, data);

      setSnackbar({
        open: true,
        message: 'Login successful!',
        severity: 'success',
      });

      setTimeout(() => {
        onLogin(res.data.user);
        navigate('/');
      }, 1000);
    } catch {
      setSnackbar({
        open: true,
        message: 'Login failed',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <AuthForm
        title="Sign In"
        fields={fields}
        validate={validate}
        onSubmit={onSubmit}
        submitLabel="Sign In"
      />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default Login;
