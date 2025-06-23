import React from 'react';
import './Post.css'

interface PostProps {
    title: string;
    author: string;
    date: string;
    content: string;
}

const Post: React.FC<PostProps> = ({ title, author, date, content }) => (
    <article className="post">
        <h2 className="post-title">{title}</h2>
        <div className="post-maker-data">
            By {author} | {new Date(date).toLocaleDateString()}
        </div>
        <div className="post-content">
            {content}
        </div>
    </article>
);

export default Post;