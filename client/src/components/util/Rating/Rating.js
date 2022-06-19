import React from 'react';
import './Rating.css';

function Rating({ props }) {
  const rate = 100 - (props?.rating / props?.numReviews) * 20;

  const style_star = {
    clipPath: props?.rating === 0 ? `inset(0 100% 0 0)` : `inset(0 ${rate}% 0 0)`,
    position: 'absolute',
    top: '0',
    left: '0',
    width: '115px',
    overflow: 'hidden',
  };

  console.log(style_star);

  return (
    <div className="rating">
      <div className="star">
        <i className="far fa-star"></i>
        <i className="far fa-star"></i>
        <i className="far fa-star"></i>
        <i className="far fa-star"></i>
        <i className="far fa-star"></i>

        <div className="star-1" style={style_star}>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
      </div>
    </div>
  );
}

export default Rating;
