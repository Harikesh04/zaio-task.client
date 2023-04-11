import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../ApiCalls/Api";
import axios from "axios";
import { hoursCommited, logout } from '../app/features/user/userSlice';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';




const Schedule = () => {
  const user = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const course = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    axios.get(`${BASE_URL}/api/v1/logout`, { withCredentials: true }).then((res) => {

      dispatch(logout(res.data));

      console.log("logged out");
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
    console.log(document.cookie);
    console.log("cookie");


    axios.get(`${BASE_URL}/api/v1/days/course?Date=${startDate}&hours=${user.hoursCommited}`, {
      withCredentials: true,
    }).then((res) => {


      console.log("got data");
      setCourses(res.data.filteredCourses);


    }).catch((err) => {

      console.log(err);

    });


  }, [])

  useEffect(() => {

    axios.get(`${BASE_URL}/api/v1/me`, {
      withCredentials: true,
    }).then((res) => {
      console.log("fetched user info successfully");
      setUserInfo(res.data.user);
      console.log(userInfo);





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


  return (
    <>
      <button onClick={handleClick}>Log Out</button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={courses}
        dayMaxEventRows={4}
        dayMaxEvents={4}
        eventMaxStack={4}
        eventContent={eventContent}
        height="80vh"

      />




    </>
  )
}

export default Schedule


