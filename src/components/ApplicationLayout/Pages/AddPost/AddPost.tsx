import React, { useState, ChangeEvent, FormEvent } from 'react';
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
        <label htmlFor="title">Post Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={post.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={post.content}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Post</button>
      </form>
    </div>
    </div>
    
  );
};

export default AddPost;