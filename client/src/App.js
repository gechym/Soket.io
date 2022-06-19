import io from 'socket.io-client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRemainingSelector } from './redux/userSelector';
import { getProducts } from '~/redux/thunk/productThunk';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DetailProduct from '~/components/body/DetailProduct/DetailProduct';
import Products from '~/components/body/Products/Products';

import './App.css';

function App() {
  const { error, loading } = useSelector(userRemainingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io.connect('http://localhost:8080');
    dispatch(getProducts(socket));

    return () => socket.close();
  }, [dispatch]);

  return (
    <div className="App">
      {loading && <h1>loading</h1>}
      {error && <h1>{error}</h1>}
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<DetailProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
