import React from "react";
import PostType from "../Types/Post";
import { Modal, Box, Typography, Button } from "@mui/material";

interface Props {
  onClose: () => void;
  post: PostType;
}

const PostModal: React.FC<Props> = ({ onClose, post }) => (
  <Modal
    open
    onClose={onClose}
    aria-labelledby="modal-title"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        borderRadius: 2,
        p: 3,
        maxWidth: 500,
        width: "90%",
        maxHeight: "80vh",
        overflowY: "auto",
        outline: "none",
      }}
    >
      <Typography id="modal-title" variant="h6" mb={2}>
        {post.title}
      </Typography>
      <Typography variant="body2" mb={1}>
        Author: {post.author}
      </Typography>
      <Typography variant="body2" mb={2}>
        Date: {post.publishedAt}
      </Typography>
      <Typography variant="body1" mb={3}>
        {post.content}
      </Typography>
      <Button variant="contained" onClick={onClose} fullWidth>
        Close
      </Button>
    </Box>
  </Modal>
);

export default PostModal;
