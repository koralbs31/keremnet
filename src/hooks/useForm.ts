import { useState, ChangeEvent, FormEvent } from 'react';

export function useForm<T extends Record<string, string>>(
  initialState: T,
  onSubmitCallback?: (formData: T) => void
) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmitCallback) onSubmitCallback(formData);
    setFormData(initialState);
  };

  return { formData, handleChange, handleSubmit };
}