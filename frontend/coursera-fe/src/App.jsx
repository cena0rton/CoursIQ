import react, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Courses from "../pages/Courses";
import Login from "../pages/Login";
import Signin from "../pages/Signup";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";
import Mycourses from "../pages/Mycourses";
import Coursedetails from "../pages/Coursedetails";

function App() {
  const [courses, setCourses] = useState([]);
  const [menu, setMenu] = useState(false);
  const [token, settoken] = useState("");

  const tok = localStorage.getItem("token");

  if(tok){
    settoken(tok);
  }
  const toggleSidebar = () => {
    setMenu( prev => !prev);
  }

  const closeSidebar =() => {
    setMenu(false);
  }

  useEffect(() => {
    const datafetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        setCourses(response.data.courses);
        console.log(response.data.courses[0]._id);
      } catch (e) {}
    };
    datafetch();
  }, []);

  return (
    <BrowserRouter>
      {!token? ( <div><Navbar toggleSidebar={toggleSidebar}/>
      <Sidebar visible={menu} closeSidebar={closeSidebar}/></div>) : (<Mycourses/>)}
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/courses"
          element={<Courses courses={courses} setCourses={setCourses} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/mycourses" element = {<Mycourses/>}/>
        <Route path="/courses/:courseId" element = {<Coursedetails />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import CoursePage from './pages/CoursePage';
// import CourseDetailPage from './pages/CourseDetailPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/courses" element={<CoursePage />} />
//         <Route path="/courses/:courseId" element={<CourseDetailPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
