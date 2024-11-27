import React from 'react';
import { Link } from "react-router-dom";
import close from "../src/close.png"

const Sidebar = ({visible, closeSidebar}) => {


  return (
    <div className={`sidebar ${visible? 'visible' : 'hidden'}`}>
        <img style={{cursor: "pointer", marginLeft: "70%", marginBottom: "30px"}}src={close} onClick={closeSidebar} height="26px" width="26px" />
      <Link
            style={{ letterSpacing: "-2px", paddingLeft: "10px" }}
            to="/admin/signup"
          >
            Signup as Admin
          </Link>

          <Link
            style={{ letterSpacing: "-2px", paddingLeft: "10px" }}
            to="/admin/login"
          >
            Login as Admin
          </Link>

          <Link
            style={{ letterSpacing: "-2px", paddingLeft: "10px" }}
            to="/courses"
          >
            Explore Courses
          </Link>
          <Link
            style={{ letterSpacing: "-2px", paddingLeft: "10px" }}
            to="/login"
          >
            Login
          </Link>
          <Link
            style={{ letterSpacing: "-2px", paddingLeft: "10px" }}
            to="/signup"
          >
            Sign Up
          </Link>
      
    </div>
  )
}

export default Sidebar
