import { useSelector } from 'react-redux';
import { userRemainingSelector } from '~/redux/userSelector';
import React, { useCallback, useEffect, useState } from 'react';
import FormInput from '~/components/util/FormInput/FormInput';
import CommentCard from './CommentCard';
import './CommentItem.css';

let showComments = [];

function CommentItem({ comment }) {
  const { socket } = useSelector(userRemainingSelector);
  const [reply, setReply] = useState(false);
  const [name, setName] = useState('');

  const [replyComment, setReplyComment] = useState([]);
  const [hideReplyComment, setHideReplyComment] = useState([]);
  const [next, setNext] = useState(3);

  const loopWithSlice = useCallback(() => {
    // 1 2 3 4 5 6  || limt = 3
    // num = 0 ->slice( (6 - (0 + limt) ) , 6 ) -> 4 5 6
    // num = 1 -> slice( (6 -  (1 + limt)) , 6 ) -> 3 4 5 6
    // num = 2 -> slice( (6 -  (2 + limt)) , 6 ) -> 2 3 4 5 6
    // num = 3 -> slice( (6 -  (3 + limt)) , 6 ) ->1 2 3 4 5 6
    // num = 4 -> slice(6 - (4 + limt), 6 ) ~ slice(0, 6) -> 1 2 3 4 5 6

    let start = comment.reply.length - next < 0 ? 0 : comment.reply.length - next;

    showComments = comment.reply.slice(start, comment.reply.length);

    setHideReplyComment(start);
    setReplyComment(showComments);

    console.log(showComments);
  }, [comment.reply, next]);

  const loadMoreRepComment = () => {
    loopWithSlice(next);
    setNext((prev) => prev + 3);
  };

  useEffect(() => {
    loopWithSlice(next);
  }, [loopWithSlice, next]);

  const handleReply = (name) => {
    setName(name);
    setReply(true);
  };

  const hideRely = () => {
    setReply(false);
    setNext(3);
  };

  return (
    <CommentCard comment={comment}>
      <div className="nav_comment">
        <p onClick={() => handleReply(comment.username)}>Rely</p>

        {hideReplyComment > 0 && <p onClick={loadMoreRepComment}>Load {hideReplyComment} comment</p>}

        <p onClick={hideRely}>Hide Rely</p>
      </div>
      {replyComment.map((rep) => {
        return (
          <CommentCard key={rep._id} comment={rep}>
            <p onClick={() => handleReply(rep.username)}>Rely</p>
          </CommentCard>
        );
      })}
      {reply && (
        <FormInput id={comment._id} socket={socket} name={name} setReply={setReply} send={'replyComment'} />
      )}
    </CommentCard>
  );
}

export default CommentItem;
