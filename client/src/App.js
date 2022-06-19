import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRemainingSelector } from './redux/userSelector';
import { getProducts } from '~/redux/thunk/productThunk';
import './App.css';

function App() {
  const { error, loading, data: users } = useSelector(userRemainingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return <div className="App">Hello World</div>;
}

export default App;
