import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Box,
  Button,
  TextField,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Comments from '../Comments/Comments';
import PostType from '../../Types/Post';
import CommentType from '../../Types/CommentType';
import { User } from '../../App';
import axios from 'axios';

interface PostProps {
  post: PostType;
  user: User | null;
  onPostUpdated: () => void;
}

const Post: React.FC<PostProps> = ({ post, user, onPostUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState<CommentType[]>(Array.isArray(post.comments) ? post.comments as unknown as CommentType[] : []);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString();

  const isAuthor = user?.username === post.user?.username;

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:1234/api/posts/${post.id}`, { title, content, userId: user?.id });
      setIsEditing(false);
      onPostUpdated();
    } catch {
      alert('Failed to update post');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:1234/api/posts/${post.id}`, { data: { userId: user?.id } });
      onPostUpdated();
    } catch {
      alert('Failed to delete post');
    }
  };

  const handleLike = async () => {
    try {
      await axios.post('http://localhost:1234/api/likes', { postId: post.id, userId: user?.id });
      setLikesCount(likesCount + 1);
    } catch {
      alert('Failed to like post');
    }
  };

  const handleCommentAdded = (newComments: CommentType[]) => {
    setComments(newComments);
  };

  return (
    <Card sx={{ borderRadius: 5, boxShadow: 10, mb: 3 }}>
      <CardHeader
        title={
          isEditing ? (
            <TextField
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
              size="small"
            />
          ) : (
            post.title
          )
        }
        subheader={`${post.user?.username || 'Unknown Author'} | ${formattedDate}`}
        action={
          isAuthor && !isEditing && (
            <>
              <IconButton onClick={() => setIsEditing(true)} aria-label="edit post">
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} aria-label="delete post">
                <DeleteIcon />
              </IconButton>
            </>
          )
        }
      />
      <CardContent>
        {isEditing ? (
          <TextField
            value={content}
            onChange={e => setContent(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
        ) : (
          <Typography variant="body1">{post.content}</Typography>
        )}

        {isEditing && (
          <Box mt={2}>
            <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        )}

        {!isEditing && (
          <Box display="flex" alignItems="center" mt={2} mb={2}>
            <IconButton onClick={handleLike} aria-label="like post" color="primary">
              <ThumbUpAltIcon />
            </IconButton>
            <Typography>{likesCount}</Typography>
          </Box>
        )}

        <Comments
          items={comments}
          user={user}
          postId={post.id}
          onCommentsChange={handleCommentAdded}
        />
      </CardContent>
    </Card>
  );
};

export default Post;
