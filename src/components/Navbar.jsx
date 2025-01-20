import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen); 
  const handleLogoutClick = () => dispatch(logout());


  return (
    <>
      <header className='flex justify-between sticky top-0 p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg rounded-lg  mt-5 mx-auto text-white'>
        <h2 className='cursor-pointer uppercase font-semibold tracking-wider'>
          <Link to="/" className='hover:text-gray-200 transition'>Task Manager Web Application</Link>
        </h2>
        <ul className='hidden md:flex gap-6 items-center'>
          {authState.isLoggedIn ? (
            <>
              <li className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition shadow-md">
                <Link to='/tasks/add' className='flex items-center gap-2'>
                  <i className="fa-solid fa-plus"></i> Add Task
                </Link>
              </li>
              <li className='py-2 px-4 cursor-pointer hover:bg-gray-200 hover:text-blue-600 text-sm bg-primary rounded-full transition' onClick={handleLogoutClick}>
                Logout
              </li>
            </>
          ) : (
            <li className='py-2 px-4 cursor-pointer bg-white text-primary hover:bg-gray-200 text-sm rounded-full transition'>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        <span className='md:hidden cursor-pointer text-white text-2xl' onClick={toggleNavbar}>
          <i className="fa-solid fa-bars"></i>
        </span>

        {/* Sidebar for smaller screens */}
        <div className={`absolute md:hidden right-0 top-0 bottom-0 transition ${(isNavbarOpen === true) ? 'translate-x-0' : 'translate-x-full'} bg-gray-50 shadow-lg w-screen sm:w-3/4 h-screen`}>
          <div className='flex justify-between items-center p-4 border-b'>
            <h2 className='uppercase font-semibold text-indigo-600'>
              Task Manager
            </h2>
            <span className='text-gray-800 text-2xl cursor-pointer' onClick={toggleNavbar}>
              <i className="fa-solid fa-xmark"></i>
            </span>
          </div>
          <ul className='flex flex-col gap-6 mt-8 px-6'>
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-600 text-white hover:bg-blue-700 py-3 px-5 rounded-full transition shadow-md text-center">
                  <Link to='/tasks/add' className='flex items-center justify-center gap-2'>
                    <i className="fa-solid fa-plus"></i> Add Task
                  </Link>
                </li>
                <li className='py-3 px-5 text-center cursor-pointer bg-white text-blue-600 hover:bg-gray-200 rounded-full transition' onClick={handleLogoutClick}>
                  Logout
                </li>
              </>
            ) : (
              <li className='py-3 px-5 text-center bg-white text-indigo-600 hover:bg-gray-200 rounded-full transition'>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>

    </>
  )
}

export default Navbar