import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase.config';

export const initializeLoginFrameWork = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
};

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
            };
            return signedInUser;
        })
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
};
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var user = result.user;
            user.success = true;
            var accessToken = credential.accessToken;
            console.log(accessToken);
            return user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            var email = error.email;

            var credential = error.credential;
            console.log(errorMessage, errorCode, email, credential);
        });
};

export const handleSignOut = () => {
    return firebase
        .auth()
        .signOut()
        .then((res) => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                success: false,
            };
            return signedOutUser;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            // Signed in

            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;

            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
};

export const signInWithEmailAndPassword = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var users = userCredential.user;
            const newUserInfo = users;
            newUserInfo.error = '';
            newUserInfo.success = true;

            return newUserInfo;

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo.error;
        });
};

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    })
        .then(function () {
            console.log('updated successfully');
            // Update successful.
        })
        .catch(function (error) {
            // An error happened.
            console.log(error);
        });
};
