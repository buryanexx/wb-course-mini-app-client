import React from 'react';
import PropTypes from 'prop-types';
import '../styles/PriceTag.css';

const PriceTag = ({
  price,
  currency = '₽',
  oldPrice,
  discount,
  period,
  size = 'medium',
  variant = 'default'
}) => {
  return (
    <div className={`price-tag price-tag-${size} price-tag-${variant}`}>
      {oldPrice && (
        <div className="price-tag-old">
          {oldPrice.toLocaleString()} {currency}
        </div>
      )}
      
      <div className="price-tag-current">
        <span className="price-tag-value">
          {price.toLocaleString()}
        </span>
        <span className="price-tag-currency">
          {currency}
        </span>
        {period && (
          <span className="price-tag-period">
            /{period}
          </span>
        )}
      </div>
      
      {discount && (
        <div className="price-tag-discount">
          -{discount}%
        </div>
      )}
    </div>
  );
};

PriceTag.propTypes = {
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  oldPrice: PropTypes.number,
  discount: PropTypes.number,
  period: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'gradient'])
};

export default PriceTag; 