import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import happyImage from '../../images/giphy.gif';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    console.log(orderPlaced);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const savedCart = getDatabaseCart();

        const orderDetails = {
            ...loggedInUser,
            products: savedCart,
            shipment: data,
            orderTime: new Date(),
        };
        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    processOrder();
                    setOrderPlaced(true);
                }
            });
    };
    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt='' />;
    }

    return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            <input
                name='Name'
                placeholder='Your Name'
                defaultValue={loggedInUser.name}
                {...register('name', { required: true })}
            />
            {errors.name && <span className='error'>This is required</span>}

            <input
                name='email'
                placeholder='Your Email'
                defaultValue={loggedInUser.email}
                {...register('email', { required: true })}
            />
            {errors.email && <span className='error'>This is required</span>}

            <input
                name='phone'
                placeholder='Your Mobile Number'
                {...register('phone', { required: true })}
            />
            {errors.phone && <span className='error'>This is required</span>}

            <input
                name='address'
                placeholder='Your Address'
                {...register('address', { required: true })}
            />
            {errors.address && <span className='error'>This is required</span>}

            <button type='submit'>Submit</button>
            <div>{thankYou}</div>
        </form>
    );
};

export default Shipment;
