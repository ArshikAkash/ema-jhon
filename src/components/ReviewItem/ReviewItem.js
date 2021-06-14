import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const { name, quantity, key, img, price } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt='' />
            </div>
            <div className='product-name'>
                <h4>{name}</h4>
                <p>
                    Quantity : <b>{quantity}</b>
                </p>
                <p>
                    <small>${price}</small>
                </p>
                <br />
                <button
                    className='main-button'
                    onClick={() => props.removeProduct(key)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;
