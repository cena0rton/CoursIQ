import React, { useState } from "react";
import course from "../src/course.png";
import { Link, useNavigate } from "react-router-dom";
import menu1 from "../src/menu.png";
import Sidebar from "../pages/Sidebar";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  function Onclickhandler() {
    navigate("/");
  }

  return (
    <div>
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "20px",
          paddingBottom: "20px",
          height: "50px",
        }}
      >
        <div
          className="mainicon"
          style={{ display: "flex", paddingLeft: "150px" }}
        >
          <img src={course} width="40px" />
          <h1
            onClick={Onclickhandler}
            style={{
              cursor: "pointer",
              letterSpacing: "-4px",
              margin: "0px",
              paddingLeft: "20px",
              paddingBottom: "12px"
            }}
          >
            coursIQ
          </h1>
        </div>

        <div
          className="navlinks"
          style={{
            paddingRight: "150px",
            display: "flex",
            alignItems: "center",
          }}
        >
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
        <img
          onClick={toggleSidebar}
          className="menu1"
          src={menu1}
          width="36px"
          alt="menu"
          style={{ display: "none" }}
        ></img>
      </div>
    </div>
  );
};

export default Navbar;
