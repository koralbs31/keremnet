import React, { useState } from 'react';
import { Box, TextField, Typography, IconButton, List, ListItem, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Comment from '../../Types/Comment';
import { User } from '../../App';
import colors from '../../colors';

interface Props {
  items?: Comment[];
  user: User | null;
}

const Comments: React.FC<Props> = ({ items = [], user }) => {
  const [comments, setComments] = useState<Comment[]>(items);
  const [newCommentInput, setNewCommentInput] = useState('');

  const handleAddComment = () => {
    if (!newCommentInput.trim() || !user) return;

    setComments(prev => [
      ...prev,
      {
        id: Date.now(),
        text: newCommentInput.trim(),
        author: user.username,
        date: new Date().toLocaleString(),
      },
    ]);
    setNewCommentInput('');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 3,
        maxWidth: 600,
        mx: 'auto',
        bgcolor: colors.commentBackground,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: colors.commentTitle, fontWeight: 'bold' }}>
        Comments
      </Typography>

      {user && (
        <Box
          component="form"
          onSubmit={e => {
            e.preventDefault();
            handleAddComment();
          }}
          sx={{ display: 'flex', gap: 1, mb: 3 }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Write a comment"
            variant="outlined"
            value={newCommentInput}
            onChange={e => setNewCommentInput(e.target.value)}
            fullWidth
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.commentButtonBg },
                '&:hover fieldset': { borderColor: colors.commentButtonBg },
                '&.Mui-focused fieldset': { borderColor: colors.commentButtonBg },
              },
              '& .MuiInputBase-input': { color: colors.commentButtonBg },
            }}
          />
          <IconButton
            type="submit"
            aria-label="post comment"
            sx={{
              color: colors.commentButtonColor,
              bgcolor: 'transparent',
              '&:hover': { bgcolor: colors.commentButtonHoverBg },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      )}

      <List
        sx={{
          maxHeight: 300,
          overflowY: 'auto',
          px: 0,
        }}
      >
        {comments.length === 0 && (
          <Typography sx={{ color: colors.commentTitle, textAlign: 'center' }}>
            No comments yet
          </Typography>
        )}

        {comments.map(({ id, author, date, text }) => (
          <ListItem
            key={id}
            sx={{
              borderBottom: `1px solid ${colors.commentsListItemBorder}`,
              py: 1,
              px: 0,
              flexDirection: 'column',
              alignItems: 'flex-start',
              color: colors.commentsListItemText,
            }}
          >
            <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
              {author}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              color="text.secondary"
              sx={{ fontStyle: 'italic', fontSize: 12 }}
            >
              {date}
            </Typography>
            <Typography sx={{ mt: 0.5 }}>{text}</Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Comments;
