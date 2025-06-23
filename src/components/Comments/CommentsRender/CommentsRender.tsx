import React from 'react';
import './CommentsRender.css'

import Comment from '../../../Types/Comment';

interface Props {
  items: Comment[];
}

const CommentsRender: React.FC<Props> = ({ items }) => {
  return (
    <div>
      <ul className="comments-list">
        {items.map((item, index) => (
          <li className="comments-list-item" key={index}>{item.text}</li> 
        ))}
      </ul>
    </div>
  );
};

export default CommentsRender;