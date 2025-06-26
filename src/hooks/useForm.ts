import { useState } from 'react';

export function useForm<T extends Record<string, string>>(
  initialState: T,
  onSubmit?: (formData: T) => void
) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
    setFormData(initialState);
  };

  return { formData, handleChange, handleSubmit };
}
