import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css'
import Enroll from "./Components/EnrollPage";
import SignIn from "./Components/SignIn.jsx";
import SignUp from "./Components/SignUp.jsx";
import Schedule from "./Components/Schedule.jsx";
import { useSelector } from "react-redux";




function App() {

  const user = useSelector((state) => state.user);


  return (
    <>
      <Router>


        <Routes>
          <Route path="/" element={user.isAuthenticated?<Navigate to="/enroll" />:<SignIn />} />
          <Route path="/signup" element={user.isAuthenticated?<Navigate to="/enroll" />:<SignUp />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/schedule" element={< Schedule/>} />
        </Routes>


      </Router>

    </>


  )
}

export default App
