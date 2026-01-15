import React, { useState, ReactNode } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
} from '@mui/material';
import { useForm } from './useForm'; 

interface Field {
  name: string;
  label: string;
  type?: string;
}

interface AuthFormProps {
  title: string;
  fields: Field[];
  validate: (data: Record<string, string>) => Record<string, string>;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel: string;
  children?: ReactNode; 
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  validate,
  onSubmit,
  submitLabel,
  children,  
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { formData, handleChange, handleSubmit: internalSubmit } = useForm(
    Object.fromEntries(fields.map(f => [f.name, ''])) as Record<string, string>,
    async (data) => {
      const validationErrors = validate(data);
      if (Object.keys(validationErrors).length) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
      await onSubmit(data);
    }
  );

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" mb={3}>
        {title}
      </Typography>

      <Box
        component="form"
        onSubmit={internalSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        {fields.map(({ name, label, type = 'text' }) => (
          <TextField
            key={name}
            label={label}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            error={Boolean(errors[name])}
            helperText={errors[name]}
            fullWidth
          />
        ))}

        {children}

        <Button type="submit" variant="contained" size="large">
          {submitLabel}
        </Button>
      </Box>
    </Paper>
  );
};

export default AuthForm;
