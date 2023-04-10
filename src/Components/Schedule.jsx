import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../ApiCalls/Api";
import axios from "axios";
import { logout } from '../app/features/user/userSlice';

const Schedule = () => {
  const user = useSelector((state) => state.user);
  const course = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    axios.get(`${BASE_URL}/api/v1/logout`).then((res) => {
      dispatch(logout(res.data));

      console.log("logged out");
      navigate("/");

    }).catch((err) => {

      console.log(err);
      setIsLoading(false);
    });


  }

  useEffect(() => {
    console.log(user);
    console.log(course);


  }, [])




  return (
    <>
      <button onClick={handleClick}>Log Out</button>

    </>
  )
}

export default Schedule