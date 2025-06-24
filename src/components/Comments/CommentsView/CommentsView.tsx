import React from 'react';
import './CommentsView.css'

import Comment from '../../../Types/Comment';

interface Props {
  items: Comment[];
}

const CommentsRender: React.FC<Props> = ({ items }) => {
  return (
      <ul className="comments-list">
        {items.map((item, index) => (
          <li className="comments-list-item" key={index}>{item.text}</li> 
        ))}
      </ul>
  );
};

export default CommentsRender;