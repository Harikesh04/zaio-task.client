import React, { useRef } from 'react'
import { hoursCommited } from '../app/features/user/userSlice';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"

const EnrollPage = () => {

  const hoursRef = useRef(2);
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(hoursRef.current);
    dispatch(hoursCommited(hoursRef.current));
    console.log(user);
    navigate("/schedule");
   
  }

  function handleHoursChange(e) {
    hoursRef.current = parseInt(e.target.value);
  }

  return (
    <div className="flex items-center content-center justify-center h-screen bg-blue-700">
      <form className="px-8 py-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="block mb-2 font-bold text-gray-700">Course</div>
          <select  className="block w-full p-2 border rounded form-select">
            <option value="java">Java</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Hours willing to commit</label>
          <select
            
            className="block w-full p-2 border rounded form-select"
            onChange={handleHoursChange}
          >
            <option value="2">2 hours per day</option>
            <option value="4">4 hours per day</option>
            <option value="6">6 hours per day</option>
          </select>

        </div>
        <div className="flex items-center justify-between">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">
            Enroll
          </button>
        </div>
      </form>
    </div>
  );
}


export default EnrollPage