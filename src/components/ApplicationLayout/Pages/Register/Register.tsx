import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from '../../../../hooks/AuthForm';
import { User } from '../../../../App';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../Routes';
import { Button, Typography, Box } from '@mui/material';
import AppSnackbar from '../../../../Modals/AppSnackbar';

interface Props {
  onRegister: (user: User) => void;
}

const Register: React.FC<Props> = ({ onRegister }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const navigate = useNavigate();

  const fields = [
    { name: 'username', label: 'Username' },
    { name: 'email', label: 'Email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const validate = (data: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!data.username.trim()) errors.username = 'Username required';
    if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Invalid email';
    if (data.password.length < 6) errors.password = 'Password too short';
    return errors;
  };

  const onSubmit = async (data: Record<string, string>) => {
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (imageFile) formData.append('image', imageFile);

      const res = await axios.post(`${ROUTES.users}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSnackbar({
        open: true,
        message: 'Registered successfully!',
        severity: 'success',
      });

      setTimeout(() => {
        onRegister(res.data.user);
        navigate('/');
      }, 1000);
    } catch {
      setSnackbar({
        open: true,
        message: 'Register failed',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <AuthForm
        title="Register"
        fields={fields}
        validate={validate}
        onSubmit={onSubmit}
        submitLabel="Register"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mt: 2,
            maxWidth: 400,
            width: '100%',
          }}
        >
          <input
            accept="image/*"
            id="profile-image-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
          <label htmlFor="profile-image-upload">
            <Button variant="outlined" component="span">
              Choose Profile Image
            </Button>
          </label>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flexGrow: 1,
            }}
          >
            {imageFile ? imageFile.name : 'No file chosen'}
          </Typography>
        </Box>
      </AuthForm>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default Register;
