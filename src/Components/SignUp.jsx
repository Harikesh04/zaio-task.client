import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BASE_URL } from "../ApiCalls/Api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/features/user/userSlice";
import toast, { Toaster } from 'react-hot-toast';
import Loader from "./Loader/Loader"

const Signup = () => {


  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastMessage = (message) => toast(message);




  function handleSignUp(e) {
    e.preventDefault();

    setIsLoading(true);
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    console.log(JSON.stringify(data));
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

    axios.post(`${BASE_URL}/api/v1/register`, data, config).then((res) => {
      dispatch(login(res.data));
      setIsLoading(false);

    }).catch((err) => {

      console.log(err);
      setIsLoading(false);
      toastMessage("user already exist!")
    });



  };
  if (user.isAuthenticated) {
    navigate("/enroll");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl ">
        <h2 className="flex justify-center mb-6 text-2xl font-medium text-blue-500">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="mb-4">

            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              ref={nameRef}

              className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div >

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              ref={emailRef}
              className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div  >

            <div className="flex items-center "  >

              <input
                type="password"
                name="password"
                placeholder="Password"

                required
                ref={passwordRef}

                className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:border-blue-500 focus:outline-none"
              />

            </div>

          </div>
          <div className="flex justify-center ">
            <button
              className="px-4 py-2 mt-5 font-semibold text-blue-600 border-2 border-blue-600 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white"

              type="submit"
            >
              {isLoading ? <Loader /> : "Sign Up"}
            </button>

          </div>

        </form>
        <p className="flex justify-center mt-4 text-sm text-gray-800">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login here
          </Link>
        </p>

      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
