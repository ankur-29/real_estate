import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex items-center justify-between mx-auto p-3 max-w-6xl'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-blue-500'>Real</span>
                    <span className='text-blue-700'> Estate</span>
                </h1>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input
                        className='bg-transparent focus:outline-none w-32 sm:w-64'
                        type='text'
                        placeholder='Search...' />
                    <IoIosSearch className='text-slate-500' />
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline hover:underline hover:text-blue-500 hover:cursor-pointer'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline hover:underline hover:text-blue-500 hover:cursor-pointer'>
                            About
                        </li>
                    </Link>
                    <Link to='/profile'>
                        { currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover'
                            src={currentUser.avatar} alt='profile'
                            />
                        ) : (
                            <li className='sm:inline hover:underline hover:text-blue-500 hover:cursor-pointer'>
                            Login
                        </li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header