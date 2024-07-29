import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import OAuth from '../components/OAuth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (err) {
      dispatch(loginFailure(err.message))
    }
  }

  return (
    <div className='mx-auto max-w-lg p-3'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
          type='text' placeholder='password' />
        <button type='submit' disabled={loading}
          className='uppercase text-white bg-blue-600 hover:opacity-95 rounded-lg p-3'>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/register'}>
          <span className='text-blue-600 hover:underline hover:cursor-pointer'>Register</span>
        </Link>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Login