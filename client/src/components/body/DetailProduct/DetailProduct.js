import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userRemainingSelector } from '~/redux/userSelector';
import { useParams } from 'react-router-dom';

import DetailProductCard from '~/components/util/DetailProductCard/DetailProductCard';
import FormInput from '~/components/util/FormInput/FormInput';
import { getComments } from '~/API/commentApi';
import CommentItem from '~/components/util/CommentItem/CommentItem';

function DetailProduct() {
  const { id } = useParams();
  const { socket, data } = useSelector(userRemainingSelector);
  const [product, setProduct] = useState();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);

      try {
        const res = await getComments(id);
        setLoading(false);
        setComments(res.data.comments);
      } catch (error) {
        setLoading(false);
        if (error.response?.data.message) {
          console.log(error.response?.data.message);
        } else {
          console.log(error.message);
        }
      }
    };

    fetchApi();
  }, [id]);

  useEffect(() => {
    socket?.emit('join_product', id);

    if (data) {
      setProduct(data.data.products.find((prod) => prod._id === id));
    }
  }, [socket, id, data]);

  useEffect(() => {
    socket?.on('sendCommentToClient', (newComment) => {
      console.log(newComment);
    });
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
        <h1>{loading && 'loading'}</h1>
        <div className="comments_list">
          {comments.map((cmt) => {
            return <CommentItem key={cmt._id} comment={cmt} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
