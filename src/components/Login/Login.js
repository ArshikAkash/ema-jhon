import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {
    createUserWithEmailAndPassword,
    handleFbSignIn,
    handleGoogleSignIn,
    handleSignOut,
    initializeLoginFrameWork,
    signInWithEmailAndPassword,
} from './LoginManager';

const Login = () => {
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
    });
    console.log(user);

    initializeLoginFrameWork();

    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: '/shipment' } };

    const googleSignIn = () => {
        handleGoogleSignIn().then((res) => {
            handleResponse(res, true);
        });
    };

    const fbSignIn = () => {
        handleFbSignIn().then((res) => {
            handleResponse(res, true);
        });
    };

    const signOut = () => {
        handleSignOut().then((res) => {
            handleResponse(res, false);
        });
    };

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    };

    const handleBlur = (e) => {
        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    };

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(
                user.name,
                user.email,
                user.password
            ).then((res) => {
                handleResponse(res, true);
            });
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password).then(
                (res) => {
                    handleResponse(res, true);
                }
            );

            e.preventDefault();
        }
    };

    return (
        <div className='App'>
            {user.isSignedIn ? (
                <button onClick={signOut}>Sign out</button>
            ) : (
                <button onClick={googleSignIn}>Sign in using Google</button>
            )}
            <br />
            <button onClick={fbSignIn}>Sign in using facebook</button>
            {user.isSignedIn && (
                <div>
                    {' '}
                    <p>Welcome,</p> <h1> {user.name}</h1>
                    <h4>{user.email}</h4>
                    <img src={user.photo} alt='' />{' '}
                </div>
            )}
            <h1>Our own authentication</h1>
            <input
                type='checkbox'
                onChange={() => setNewUser(!newUser)}
                name='newUser'
                id=''
            />
            <label htmlFor='newUser'>new user sign up </label>
            <form onSubmit={handleSubmit}>
                {newUser && (
                    <input
                        onBlur={handleBlur}
                        name='name'
                        required
                        placeholder='your name'
                        type='text'
                    />
                )}
                <br />
                <input
                    onBlur={handleBlur}
                    type='text'
                    name='email'
                    id=''
                    placeholder='Username or email'
                    required
                />{' '}
                <br />
                <input
                    onBlur={handleBlur}
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                />
                <br />
                <input type='submit' value={newUser ? 'Sign up' : 'Sign in'} />
            </form>
            <h3>{LoggedInUser.email}</h3>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && (
                <p style={{ color: 'green' }}>
                    User {newUser ? 'created' : 'logged in'} successfully
                </p>
            )}
        </div>
    );
};

export default Login;
