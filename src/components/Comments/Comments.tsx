import React, { useState } from 'react';
import './Comments.css'

interface Comment {
    id: number;
    text: string;
}

const Comments: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
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
            <input
                className="comments-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Add a comment..."
            />
            <button className="comments-post-btn" onClick={handleAddComment}>Post</button>
            <ul className="comments-list">
                {comments.map(comment => (
                    <li className="comments-list-item" key={comment.id}>{comment.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;