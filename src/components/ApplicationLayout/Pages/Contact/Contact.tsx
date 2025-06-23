import React, { useState, ChangeEvent, FormEvent } from 'react';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Thanks for your message, ${formData.name}!`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className='contact-page-wrapper'>
<div className="contact-page">
      <div className="contact-info">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hi — drop us a message.
        </p>
        <div className="contact-about">
          <h3>About This App</h3>
          <p>
            This app is for course kerem! here we will talk after the course ends and will keep in touch!
          </p>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h1>Have any question?</h1>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
    </div>
    
  );
};

export default Contact;