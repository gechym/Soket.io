import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userRemainingSelector } from '~/redux/userSelector';
import { useParams } from 'react-router-dom';

import DetailProductCard from '~/components/util/DetailProductCard/DetailProductCard';

function DetailProduct() {
  const { id } = useParams();
  const { socket, data } = useSelector(userRemainingSelector);
  const [product, setProduct] = useState();

  useEffect(() => {
    socket?.emit('join_product', id);

    if (data) {
      setProduct(data.data.products.find((prod) => prod._id === id));
    }
  }, [socket, id, data]);

  return <div className="detail_product_page">{product && <DetailProductCard product={product} />}</div>;
}

export default DetailProduct;
