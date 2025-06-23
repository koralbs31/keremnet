import React, { useState } from 'react';
import './Comments.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Comment from '../../Types/Comment';
import CommentsRender from './CommentsRender/CommentsRender';

interface Props {
  items?: Comment[];
}

const Comments: React.FC<Props> = ({items}) => {
    const [comments, setComments] = useState<Comment[]>(items || []);
    const [input, setInput] = useState('');

    const handleAddComment = () => {
        if (input.trim() === '') return;
        setComments([
            ...comments,
            { id: Date.now(), text: input.trim() }
        ]);
        setInput('');
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
                <TextField id="outlined-basic" label="Comment" variant="outlined" value={input} onChange={e => setInput(e.target.value)}/>
                </Box>
            <Button variant="contained" onClick={handleAddComment}>Post</Button>

            <CommentsRender items={comments}></CommentsRender>
        </div>
    );
};

export default Comments;