import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validateManyFields from '../validations';
import Input from './utils/Input';
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from '../redux/actions/authActions';
import Loader from './utils/Loader';
import { useEffect } from 'react';

const LoginForm = ({ redirectUrl }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const authState = useSelector(state => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();


  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [authState, redirectUrl, isLoggedIn, navigate]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  }



  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className="m-auto my-16 max-w-[500px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-lg">
  {loading ? (
    <Loader />
  ) : (
    <>
      <h2 className="text-center mb-6 text-white text-2xl font-bold">
        Welcome Back!
      </h2>
      <p className="text-center mb-6 text-white text-sm">
        Please log in to access your account.
      </p>
      
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-white font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Email
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          placeholder="youremail@domain.com"
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        {fieldError("email")}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-white font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Password
        </label>
        <Input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          placeholder="Your password.."
          onChange={handleChange}
          className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        {fieldError("password")}
      </div>

      <button
        className="w-full bg-purple-600 text-white py-3 rounded-md font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 transition duration-300"
        onClick={handleSubmit}
      >
        Login
      </button>

      <div className="pt-4 text-center">
        <Link
          to="/signup"
          className="text-white underline hover:text-purple-200 transition duration-300"
        >
          Don’t have an account? Sign up here
        </Link>
      </div>
    </>
  )}
</form>

    </>
  )
}

export default LoginForm