import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userRemainingSelector } from '~/redux/userSelector';
import { useParams } from 'react-router-dom';

import DetailProductCard from '~/components/util/DetailProductCard/DetailProductCard';
import FormInput from '~/components/util/FormInput/FormInput';
import CommentItem from '~/components/util/CommentItem/CommentItem';
import useInfinityloading from '~/hooks/useInfinityloadingProduct';

function DetailProduct() {
  const { id } = useParams();
  const { socket, data } = useSelector(userRemainingSelector);
  const [product, setProduct] = useState();

  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);

  const [limit] = useState(5);
  const [firstLoad, setFirstLoad] = useState(false);
  const [stop, setStop] = useState(false);

  //TODO: InfinityLoading
  const { commentsApi, loading, btnRender } = useInfinityloading({
    id: id,
    limit: limit,
    depens: [id],
    otp: { stop: stop, firstLoad: firstLoad },
  });

  useEffect(() => {
    setComments([]);
    setStop(false);
    setFirstLoad(false);
  }, [id]);

  useEffect(() => {
    setComments((prev) => [...prev, ...commentsApi]);
    setFirstLoad(true);
    if (commentsApi?.length < limit) setStop(true);
    else setStop(false);
  }, [commentsApi, limit]);

  // Realtime
  useEffect(() => {
    socket?.emit('join_product', id);

    if (data) {
      setProduct(data.data.products.find((prod) => prod._id === id));
    }
  }, [socket, id, data]);

  useEffect(() => {
    socket?.on('sendCommentToClient', (newComment) => {
      setComments((prev) => [newComment, ...prev]);
    });

    return () => socket?.off('sendCommentToClient');
  }, [socket]);

  useEffect(() => {
    socket?.on('sendReplyToClient', (comment) => {
      setComments((prev) => {
        return prev.map((cm) => {
          if (cm._id === comment._id) {
            cm.reply = comment.reply;
            return cm;
          }
          return cm;
        });
      });
    });

    return () => socket?.off('sendReplyToClient');
  }, [socket]);

  return (
    <div className="detail_product_page">
      {product && <DetailProductCard product={product} />}
      <div className="comments">
        <h2 className="app_title">Realtime website ( chat, comments ... ) with MERN Stack and Socket.io</h2>
        <div className="reviews">
          <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
          <label htmlFor="rd-5" className="fas fa-star"></label>

          <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
          <label htmlFor="rd-4" className="fas fa-star"></label>

          <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
          <label htmlFor="rd-3" className="fas fa-star"></label>

          <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
          <label htmlFor="rd-2" className="fas fa-star"></label>

          <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
          <label htmlFor="rd-1" className="fas fa-star"></label>
        </div>
        <FormInput id={id} socket={socket} rating={rating} />
        {/* //TODO: Create comment and emit socket to */}
        database
        <div className="comments_list">
          {comments.map((cmt) => {
            return <CommentItem key={cmt._id} comment={cmt} />;
            //  TODO: foreach Component CommentItem To show all Comments and finityload
          })}
        </div>
        <h1>{loading && 'loading'}</h1>
      </div>
      {btnRender()}
    </div>
  );
}

export default DetailProduct;
