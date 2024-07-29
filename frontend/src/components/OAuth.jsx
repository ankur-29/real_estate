import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleAuth = async () => {
        try {
            const googleProvider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, googleProvider);
            const googleData = {
                name : result.user.displayName,
                email : result.user.email,
                photo : result.user.photoURL,
            }
            const res = await fetch('/user/googleAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(googleData),
            })
            const data = await res.json();
            dispatch(loginSuccess(data));
            navigate('/');
        } catch (err) {
            console.log(`Could not sign in to google, ${err}`)
        }
    }

    return (
        <button onClick={handleGoogleAuth}
            type='button'
            className='bg-green-500 rounded-lg p-3 text-white hover:opacity-95'>
            Continue with Google
        </button>
    )
}

export default OAuth;