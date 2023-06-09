import React, { useRef } from 'react'
import { hoursCommited } from '../app/features/user/userSlice';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';


const EnrollPage = () => {

  const hoursRef = useRef(2);
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const navigate = useNavigate();
  const toastMessage = (message) => toast(message);

  function handleSubmit(e) {
    e.preventDefault();
   
    dispatch(hoursCommited(hoursRef.current));
    
    navigate("/schedule");
    // toastMessage("Congrats ! you have successfully enrolled")
   
  }

  function handleHoursChange(e) {
    hoursRef.current = parseInt(e.target.value);
  }

  return (
    <>
   
    <div className='p-5 bg-blue-500'>

<div className='flex justify-center font-semibold text-white'>Hi 👋 {user.loginInfo.user.name} ! Choose your and course and time you want to commit</div>
</div>
    <div className="flex items-center content-center justify-center h-screen bg-gray-100 bg-midnight">
      
      <form className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex justify-center mb-6 text-2xl font-medium text-blue-500">Course</div>
          <label className="block mb-2 text-lg">Course</label>
          <select  className="block w-full p-2 border border-blue-600 rounded form-select">
            <option value="java">Java</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-lg ">Hours willing to commit</label>
          <select
            
            className="block w-full p-2 border border-blue-600 rounded form-select"
            onChange={handleHoursChange}
          >
            
            <option value="2">2 hours per day</option>
            <option value="4">4 hours per day</option>
            <option value="6">6 hours per day</option>
          </select>

        </div>
        <div className="flex justify-center ">
          <button
            className="px-4 py-2 mt-5 font-semibold text-blue-600 border-2 border-blue-600 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white"

           
          >
            Enroll
          </button>

          </div>
      </form>
      <Toaster/>
    </div>
    </>
  );
}


export default EnrollPage