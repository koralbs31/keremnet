import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { ROUTES } from "../../../../Routes";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../App";
import { useSnackbar } from "../../../../Modals/SnackbarContext"; 
import "./AddPost.css";

interface AddPostProps {
  user: User | null;
}

const AddPost: React.FC<AddPostProps> = ({ user }) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar(); 

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.post(ROUTES.addPost, {
        title,
        content,
        author: user.username,
      });
      showSnackbar("Post submitted successfully!", "success");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to submit post.", "error");
    }
  };

  return (
    <div className="add-post">
      <Paper elevation={4} className="add-post-container">
        <Typography variant="h4" gutterBottom>
          Add New Post
        </Typography>

        <Box
          component="form"
          className="add-post-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            label="Post Title"
            name="title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Content"
            name="content"
            variant="outlined"
            multiline
            rows={6}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, alignSelf: "flex-start" }}
          >
            Submit Post
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default AddPost;
