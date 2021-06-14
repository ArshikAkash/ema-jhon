import React, { useEffect, useState } from 'react';
import {
    getDatabaseCart,
    removeFromDatabaseCart,
} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    };

    const removeProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productKeys),
        })
            .then((res) => res.json())
            .then((data) => {
                const cartProducts = productKeys.map((key) => {
                    const product = data.find((pd) => pd.key === key);
                    product.quantity = savedCart[key];
                    return product;
                });
                setCart(cartProducts);
            });
    }, []);
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt='' />;
    }
    return (
        <div className='twin-container'>
            <div className='product-container'>
                {cart.map((pd) => (
                    <ReviewItem
                        key={pd.key}
                        product={pd}
                        removeProduct={removeProduct}
                    ></ReviewItem>
                ))}
                {thankYou}
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button
                        onClick={handleProceedCheckout}
                        className='main-button'
                    >
                        Proceed Checkout
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
