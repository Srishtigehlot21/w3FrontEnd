import React from 'react'
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <div className='relative flex justify-center bg-gray-50 h-screen w-screen overflow-x-hidden'>
      <div className="w-[80%] bg-white ">
        <Navbar />
        {children}
      </div>
      </div>
    </>
  )
}

export default MainLayout;