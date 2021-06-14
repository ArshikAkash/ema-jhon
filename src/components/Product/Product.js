import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt='' />
            </div>
            <div className='product-name'>
                <h3>
                    <Link to={'/product/' + key}>{name}</Link>
                </h3>
                <br />
                <p>
                    <small>by:{seller} </small>
                </p>
                <b>${price}</b>
                <p>
                    <small>Only {stock} left, Order soon.</small>
                </p>
                {props.showAddToCart && (
                    <button
                        className='main-button'
                        onClick={() => props.handleAddProduct(props.product)}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product;
