import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);



  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className="h-[60vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg h-[200px] mt-5 text-white">
            <h2 className="text-3xl font-bold mb-6">Welcome to Task Manager</h2>
            <p className="mb-6 text-xl">The most efficient way to manage your tasks</p>
            <Link
              to="/signup"
              className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
            >
              Join Now
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center my-8">
              <h1 className="text-2xl font-bold text-gray-800">Welcome, {authState.user.name}!</h1>
              <p className="text-lg text-gray-600 mt-2">You’re all set to start managing your tasks.</p>
            </div>
            <Tasks />
          </>
        )}
      </MainLayout>

    </>
  )
}

export default Home