import { useSelector } from 'react-redux';
import { userRemainingSelector } from '~/redux/userSelector';
import React, { useState } from 'react';
import FormInput from '~/components/util/FormInput/FormInput';
import CommentCard from './CommentCard';
import './CommentItem.css';

function CommentItem({ comment }) {
  const [reply, setReply] = useState(false);
  const [name, setName] = useState('');
  const { socket } = useSelector(userRemainingSelector);

  const handleReply = (name) => {
    setName(name);
    setReply(true);
  };

  const hideRely = () => {
    setReply(false);
  };

  return (
    <div>
      <CommentCard comment={comment}>
        <p onClick={() => handleReply(comment.username)}>Rely</p>
        <p>Load more comment</p>
        <p onClick={hideRely}>Hide Rely</p>

        {comment.reply.map((rep) => {
          return (
            <CommentCard key={rep._id} comment={rep}>
              <p onClick={() => handleReply(rep.username)}>Rely</p>
              <p>Load more comment</p>
              <p onClick={hideRely}>Hide Rely</p>
            </CommentCard>
          );
        })}

        {reply && (
          <FormInput id={comment._id} socket={socket} name={name} setReply={setReply} send={'replyComment'} />
        )}
      </CommentCard>
    </div>
  );
}

export default CommentItem;
