import React from 'react';
import CommentCard from './CommentCard';
import './CommentItem.css';

function CommentItem({ comment }) {
  return (
    <div>
      <CommentCard comment={comment}>
        <p>Rely</p>
        <p>Load more comment</p>
        <p>Hide Rely</p>
      </CommentCard>
    </div>
  );
}

export default CommentItem;
