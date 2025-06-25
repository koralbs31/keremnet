import React from 'react';
import { Card, CardContent, CardHeader, Typography, IconButton, Box} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Comments from '../Comments/Comments';
import PostType from '../../Types/Post'

const Post: React.FC<PostType> = ({ title, author, publishedAt, content }) => {

    return (
        <Card sx={{borderRadius: 5, boxShadow: 10}}>
            <CardHeader
                title={title}
                subheader={`${author} | ${new Date(publishedAt).toLocaleDateString()}`}
            />
            <CardContent>
                <Typography variant="body1">
                    {content}
                </Typography>
                <Box display="flex" alignItems="center">
                    <IconButton >
                        {<ThumbUpAltIcon />}
                    </IconButton>
                </Box>

                <Comments/>
            </CardContent>
        </Card>
    );
};

export default Post;
