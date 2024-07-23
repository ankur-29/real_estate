import React from 'react';
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='mx-auto max-w-lg p-3'>
      <h1 className='text-3xl my-7 text-center font-semibold'>Register</h1>
      <form className='flex flex-col gap-4'>
        <input
          id='username'
          className='border p-3 rounded-lg'
          type='text' placeholder='username' />
        <input
          id='email'
          className='border p-3 rounded-lg'
          type='text' placeholder='email' />
        <input
          id='password'
          className='border p-3 rounded-lg'
          type='text' placeholder='password' />
        <button className='uppercase text-white bg-blue-600 hover:opacity-95 rounded-lg p-3'>
          Register
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/login'}>
        <span className='text-blue-600 hover:underline hover:cursor-pointer'>Login</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup;