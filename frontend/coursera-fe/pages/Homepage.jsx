import React from "react";
import { Link, useNavigate } from "react-router-dom";
import webdev from "../src/webdev.jpg";
import Navbar from "../pages/Navbar";

const Homepage = () => {
  const navigate = useNavigate();

  const handlebutton = (route) => {
    navigate(`/${route}`);
  };

  return (
    <div>
      <div
        className="hero"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            paddingLeft: "25%",
            paddingRight: "25%",
            letterSpacing: "-2px",
            fontSize: "50px",
            margin: 0,
            marginBottom:30
          }}
        >
          Discover courses tailored for you
          <br />
          by <span>experts</span>, <br /> designed to transform your passion
          into <span>expertise</span>.
        </h1>
        <div>
          <button
            onClick={() => {
              handlebutton("courses");
            }}
          >
            Explore Courses
          </button>
          <button
            onClick={() => {
              handlebutton("signup");
            }}
          >
            {" "}
            Sign Up{" "}
          </button>
        </div>
      </div>


      <div>

        <div className="webdevimg">
        <img src={webdev} width="100%" height="100%"/>
        </div>
        
      </div>
    </div>
  );
};

export default Homepage;
