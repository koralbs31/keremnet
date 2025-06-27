import React from 'react';
import './CommentsView.css';

import CommentType from '../../../Types/CommentType';

interface Props {
  items: CommentType[];
}

const CommentsView: React.FC<Props> = ({ items }) => {
  return (
    <ul className="comments-list">
      {items.map((item) => (
        <li className="comments-list-item" key={item.id}>
          <strong>{item.author.username}</strong> ({item.date}): {item.text}
        </li>
      ))}
    </ul>
  );
};

export default CommentsView;
