import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../ApiCalls/Api";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { hoursCommited, logout } from '../app/features/user/userSlice';
import Loader from "./Loader/Loader"


import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';





const Schedule = () => {
  const user = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const course = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastMessage = (message) => toast(message);

  function handleClick() {
    axios.get(`${BASE_URL}/api/v1/logout`, { withCredentials: true }).then((res) => {

      dispatch(logout(res.data));

      toastMessage("logged out successfully!")
      navigate("/");

    }).catch((err) => {

      console.log(err);
      setIsLoading(false);
    });


  }


  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // JavaScript months are zero-indexed, so add 1
  const day = today.getDate();
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const startDate = `${year}-${formattedMonth}-${formattedDay}`;


  useEffect(() => {

    console.log("cookie");


    axios.get(`${BASE_URL}/api/v1/days/course?Date=${startDate}&hours=${user.hoursCommited}`, {
      withCredentials: true,
    }).then((res) => {
      setLoading(false);
      setCourses(res.data.filteredCourses);
    }).catch((err) => {
      console.log(err);
    });


  }, [])


  const eventContent = (arg) => {
    return (
      <div className="w-auto overflow-hidden break-all form-control">
        <label
          className="overflow-hidden text-red-500 break-all cursor-pointer label hover:bg-black hover:text-white"
          key={arg.event.title + arg.event.startStr}
        >
          <input
            type="checkbox"
            readOnly
            checked={
              new Date().getTime() > new Date(arg.event.startStr).getTime()
            }
            className="checkbox-warning checkbox"
          />
          <span className="w-5/6 truncate label-text text-inherit">
            {arg.event.title}
          </span>

        </label>
      </div>
    );
  };
  const CustomHeader = ({ title }) => {
    return (
      <div className="fc-toolbar-title">{title}</div>
    );
  };
  const headerToolbarOptions = {
    left: 'prev',
    center: 'title',
    right: 'next,today'


  };
  const calendarOptions = {
    plugins: [dayGridPlugin],
    weekNumberCalculation: 'ISO',
    firstDay: 1,
    aspectRatio: 1
  };


  return (
    <>
      <div>
        <div className='p-5 bg-blue-500'>

          <div className='flex justify-center font-semibold text-white'>Hi 👋 {user.loginInfo.user.name} ! Complete your daily task here</div>
        </div>
        {loading ? (<Loader/>) : (<div className='mt-10'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={courses}
            dayMaxEventRows={4}
            dayMaxEvents={4}
            eventMaxStack={4}
            eventContent={eventContent}
            height="80vh"
            headerToolbar={headerToolbarOptions}
            customHeader={CustomHeader}
            {...calendarOptions}

          />

        </div>
        )}

        <div className='flex justify-center mt-5 '>

          <button className='flex justify-center px-4 py-2 mb-10 font-semibold text-blue-600 border-2 border-blue-600 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white' onClick={handleClick}>Log Out</button>
        </div>
        <Toaster />

      </div>






    </>
  )
}

export default Schedule


