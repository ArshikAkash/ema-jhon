import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
	const first10 = fakeData.slice(0, 10);
	const [products] = useState(first10);

	return (
		<div className='shop-container'>
			<div className='product-container'>
				<h3>{products.length}</h3>

				{products.map((product) => (
					<Product product={product}>{product.name}</Product>
				))}
			</div>
			<div className='cart-container'>
				<h2>this is cart</h2>
			</div>
		</div>
	);
};

export default Shop;
