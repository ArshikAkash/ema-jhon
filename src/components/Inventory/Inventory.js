import React from 'react';

const Inventory = () => {
    const product = {};
    const handleAddProduct = () => {
        fetch('https://tranquil-dawn-83509.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
    };
    return (
        <div>
            <h1>this is inventory</h1>
            <form action=''>
                <p>
                    <span>Name: </span>
                    <input type='text' />
                </p>
                <p>
                    <span>Price: </span>
                    <input type='text' />
                </p>
                <p>
                    <span>Quantity: </span>
                    <input type='text' />
                </p>
                <p>
                    <span>Product Image</span>
                    <input type='file' />
                </p>
                <button onClick={handleAddProduct}>Add product</button>
            </form>
        </div>
    );
};

export default Inventory;
