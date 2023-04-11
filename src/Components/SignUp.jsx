import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BASE_URL } from "../ApiCalls/Api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/features/user/userSlice";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch =useDispatch();
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);

  };

  function handleSignUp(e) {
    e.preventDefault();
    console.log("submited");
    setIsLoading(true);
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    console.log(JSON.stringify(data));
    const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };
   
    axios.post(`${BASE_URL}/api/v1/register`, data, config).then((res) => {
      dispatch(login(res.data));
      setIsLoading(false);
      console.log(user);
      console.log(document.cookie);
      console.log("cookie");

    }).catch((err) => {
      
      console.log(err);
      setIsLoading(false);
    });


  };
  if (user.isAuthenticated) {
    navigate("/enroll");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-medium text-gray-800">Signup</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-gray-800">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              ref={nameRef}

              className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              ref={emailRef}
              className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-gray-800"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"

                required
                ref={passwordRef}

                className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="w-5 h-5 text-gray-600" />
                ) : (
                  <AiFillEye className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          <button
            className="inline-block px-4 py-2 font-semibold text-blue-600 border-2 border-blue-600 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white"

            type="submit"
          >
            {isLoading ? "loading" : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-800">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
