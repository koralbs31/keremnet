import React from 'react';
import { TextField, Button } from '@mui/material';
import { useForm } from '../../../../hooks/useForm';
import './AddPost.css';

const AddPost: React.FC = () => {
  const { formData: post, handleChange, handleSubmit } = useForm(
    { title: '', content: '' },
    (data) => {
      alert(`Post added!\n\nTitle: ${data.title}\nContent: ${data.content}`);
    }
  );

  return (
    <div className="add-post">
      <div className="add-post-container">
        <h2>Add New Post</h2>
        <form className="add-post-form" onSubmit={handleSubmit}>
          <TextField
            label="Post Title"
            name="title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={post.title}
            onChange={handleChange}
            required
          />

          <TextField
            label="Content"
            name="content"
            margin="normal"
            multiline
            rows={2}
            fullWidth
            value={post.content}
            onChange={handleChange}
            required
          />

          <Button variant="contained" color="primary" type="submit">
            Submit Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;