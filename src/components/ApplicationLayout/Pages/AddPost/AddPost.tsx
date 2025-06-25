import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "../../../../hooks/useForm";
import axios from "axios";
import AppSnackbar from "../../../../Modals/AppSnackbar"
import {ROUTES} from '../../../../Routes'
import "./AddPost.css";

const AddPost: React.FC = () => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const { formData: post, handleChange, handleSubmit } = useForm(
    { author: "", title: "", content: "" },
    async (data) => {
      try {
        await axios.post(ROUTES.addPost, data);
        setSnackbar({ open: true, message: "Post submitted successfully!", severity: "success" });
      } catch (error) {
        console.error(error);
        setSnackbar({ open: true, message: "Failed to submit post.", severity: "error" });
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

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default AddPost;
