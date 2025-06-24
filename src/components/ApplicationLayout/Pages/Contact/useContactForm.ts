import { useState, ChangeEvent, FormEvent } from 'react';

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export const useContactForm = (onSubmitCallback?: () => void) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Thanks for your message, ${formData.name}!`);
    setFormData({ name: '', email: '', message: '' });
    if (onSubmitCallback) onSubmitCallback();
  };

  return { formData, handleChange, handleSubmit };
};