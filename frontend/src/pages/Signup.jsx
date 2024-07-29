import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/login');
    } catch (e) {
      setLoading(false);
      setError(data.message);
    }
  }

  return (
    <div className='mx-auto max-w-lg p-3'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Register</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={handleChange}
          id='username'
          className='border p-3 rounded-lg'
          type='text' placeholder='username' />
        <input onChange={handleChange}
          id='email'
          className='border p-3 rounded-lg'
          type='text' placeholder='email' />
        <input onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
          type='text' placeholder='password' />
        <button type='submit' disabled={loading}
          className='uppercase text-white bg-blue-600 hover:opacity-95 rounded-lg p-3'>
          {loading ? 'Loading...' : 'Register'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/login'}>
          <span className='text-blue-600 hover:underline hover:cursor-pointer'>Login</span>
        </Link>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Signup;