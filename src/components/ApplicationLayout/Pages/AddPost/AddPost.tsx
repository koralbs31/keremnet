import React, { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './AddPost.css';

interface PostData {
  title: string;
  content: string;
}

const AddPost: React.FC = () => {
  const [post, setPost] = useState<PostData>({
    title: '',
    content: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Post added!\n\nTitle: ${post.title}\nContent: ${post.content}`);
    setPost({ title: '', content: '' });
  };

  return (
    <div className='add-post'>
      <div className="add-post-container">
        <h2>Add New Post</h2>
        <form className="add-post-form" onSubmit={handleSubmit}>
          <TextField
            label="Post Title"
            id="title"
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
            id="content"
            name="content"
            margin="normal"
            multiline
            rows={2}
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