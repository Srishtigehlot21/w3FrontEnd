import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, object) => ({ ...total, [object.field]: object.err }), {}));
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => navigate("/login"));

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
              Create Your Account
            </h2>
            <p className="text-center mb-6 text-white text-sm">
              Sign up to explore amazing features!
            </p>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-white font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                placeholder="Your name"
                onChange={handleChange}
                className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              {fieldError("name")}
            </div>

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
              Sign Up
            </button>

            <div className="pt-4 text-center">
              <Link
                to="/login"
                className="text-white underline hover:text-purple-200 transition duration-300"
              >
                Already have an account? Login here
              </Link>
            </div>
          </>
        )}
      </form>

    </>
  )
}

export default SignupForm