import React from "react";
import "./PostModal.css";
import PostType from "../Types/Post";
import Button from '@mui/material/Button';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostType;
}

const PostModal: React.FC<Props> = ({ setOpenModal, post }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>{post.title}</h1>
        </div>
        <div className="body">
          <p><strong>Author:</strong> {post.author}</p>
          <p><strong>Date:</strong> {post.publishedAt}</p>
          <p>{post.content}</p>
        </div>
        <div className="footer">
          <Button variant="contained" onClick={() => setOpenModal(false)}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;