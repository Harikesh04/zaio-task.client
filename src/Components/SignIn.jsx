import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";



import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../ApiCalls/Api";
import { login } from "../app/features/user/userSlice";
import toast, { Toaster } from 'react-hot-toast';
import Loader from "./Loader/Loader"

const LoginSignup = () => {
 
  const user = useSelector((state) => state.user);
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const toastMessage = (message) => toast(message);

  

  function handleSignIn(e) {
    e.preventDefault();
    console.log("submited");
    setIsLoading(true);
    const data = {
      
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    console.log(JSON.stringify(data));
    const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
   
    axios.post(`${BASE_URL}/api/v1/login`, data,config).then((res) => {
      dispatch(login(res.data));
      setIsLoading(false);
     

    }).catch((err) => {
      
      toastMessage(`Invalid email or password`);
     
      setIsLoading(false);
    });


  };
  if (user.isAuthenticated) {
    navigate("/enroll");
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl ">
        <h2 className="flex justify-center mb-6 text-2xl font-medium text-blue-500">
          Login 
        </h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div >
           
            <input
               type="email"
               name="email"
               required
               placeholder="Email"
               ref={emailRef}
              className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div >
           
            <div>
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
            {isLoading ? <Loader /> : "Sign In"}
          </button>

          </div>
          <p className="flex justify-center mt-4 text-sm text-gray-800">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup here
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default LoginSignup;
