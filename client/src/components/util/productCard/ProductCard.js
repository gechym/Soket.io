import React from 'react';
import { Link } from 'react-router-dom';
import './productCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product_card">
      <img src={product.images.url} alt="" />
      <h3>{product.title}</h3>
      <span>$ {product.price}</span>
      <p>{product.description}</p>
      <div className="product_card_row">
        <Link to={`/products/${product._id}`}>View</Link>
        <button>Buy</button>
      </div>
    </div>
  );
};

export default ProductCard;
