import React from 'react';
import { TextField, Button } from '@mui/material';
import { useForm } from '../../../../hooks/useForm';
import axios from 'axios';
import './AddPost.css';

const AddPost: React.FC = () => {
  const { formData: post, handleChange, handleSubmit } = useForm(
    { author: '', title: '', content: '' },
    async (data) => {
      try {
        await axios.post('http://localhost:8080/api/posts/add', data);
        alert(`Post added!`);
      } catch (error) {
        console.error(error);
        alert('Something went wrong while adding the post.');
      }
    }
  );

  return (
    <div className="add-post">
      <div className="add-post-container">
        <h2>Add New Post</h2>
        <form className="add-post-form" onSubmit={handleSubmit}>
          <TextField
            label="Author"
            name="author"
            variant="outlined"
            fullWidth
            margin="normal"
            value={post.author}
            onChange={handleChange}
            required
          />
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
            rows={4}
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