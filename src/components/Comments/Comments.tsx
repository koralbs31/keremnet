import React, { useState } from 'react';
import './Comments.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Comment from '../../Types/Comment';
import CommentsView from './CommentsView/CommentsView';

interface Props {
  items?: Comment[];
}

const Comments: React.FC<Props> = ({items}) => {
    const [comments, setComments] = useState<Comment[]>(items || []);
    const [newCommentInput, setNewCommentInput] = useState('');

    const handleAddComment = () => {
        const comment = newCommentInput.trim()
        if (comment === '') return;
        setComments([
            ...comments,
            { id: Date.now(), text: comment }
        ]);
        setNewCommentInput('');
    };

    return (
        <div className="comments-container">
            <h3 className="comments-title">Comments</h3>
                <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
                <TextField id="outlined-basic" label="Comment" variant="outlined" value={newCommentInput} onChange={e => setNewCommentInput(e.target.value)}/>
                </Box>
            <Button variant="contained" onClick={handleAddComment}>Post</Button>

            <CommentsView items={comments}/>
        </div>
    );
};

export default Comments;