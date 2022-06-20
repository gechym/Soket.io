import { useSelector } from 'react-redux';
import ProductCard from '~/components/util/productCard/ProductCard';
import { userRemainingSelector } from '~/redux/userSelector';

function Products() {
  const { data } = useSelector(userRemainingSelector);
  return (
    <>
      <h2 className="app_title">Realtime website ( chat, comments ... ) with MERN Stack and Socket.io</h2>
      <div className="products_page">
        {data?.data.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Products;
