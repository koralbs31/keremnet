import React from 'react';
import './CommentsView.css';

import Comment from '../../../Types/Comment';

interface Props {
  items: Comment[];
}

const CommentsView: React.FC<Props> = ({ items }) => {
  return (
    <ul className="comments-list">
      {items.map((item) => (
        <li className="comments-list-item" key={item.id}>
          <strong>{item.author}</strong> ({item.date}): {item.text}
        </li>
      ))}
    </ul>
  );
};

export default CommentsView;
