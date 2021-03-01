import React from 'react';
import './Cart.css';

const Cart = (props) => {
	const cart = props.cart;
	let total = 0;
	for (let i = 0; i < cart.length; i++) {
		const product = cart[i];
		total = total + product.price;
	}
	let shipping = 0;
	if (total > 35) {
		shipping = 0;
	} else if (total > 0) {
		shipping = 12.99;
	} else if (total > 15) {
		shipping = 4.99;
	}
	const tax = total * 0.12;
	const grandTotal = (total + shipping + tax).toFixed(2);
	const formatNumber = (num) => {
		const precision = num.toFixed(2);
		return Number(precision);
	};
	return (
		<div>
			<div className='order-summery'>
				<h2>Order Summery</h2>
				<h5>Items Ordered : {cart.length} </h5>
				<h6>Shipping Cost : ${formatNumber(shipping)}</h6>
				<h6>Product Price : ${formatNumber(total)}</h6>
				<h6>Tax : ${formatNumber(tax)}</h6>
				<h6>Total Cost : ${grandTotal} </h6>
			</div>
		</div>
	);
};

export default Cart;
