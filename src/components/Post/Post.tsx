import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Comments from '../Comments/Comments';
import PostType from '../../Types/Post';
import { User } from '../../App';

interface PostProps {
  post: PostType;
  user: User | null;
}

const Post: React.FC<PostProps> = ({ post, user }) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString();

  return (
    <Card sx={{ borderRadius: 5, boxShadow: 10, mb: 3 }}>
      <CardHeader
        title={post.title}
        subheader={`${post.user?.username || 'Unknown Author'} | ${formattedDate}`}
      />

      <CardContent>
        <Typography variant="body1" >
          {post.content}
        </Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <IconButton>
            <ThumbUpAltIcon />
          </IconButton>
        </Box>

        <Comments user={user} />
      </CardContent>
    </Card>
  );
};

export default Post;
