import react, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Courses = ({ courses }) => {
  return (
      <div style={{paddingTop: "40px"}}>
          <h1 style={{textAlign: "center", color: "blue"}}> Courses </h1>
    <div className="coursecontainer">
      {courses &&
        courses.map((course, index) => (
          <div key={index}>
            <div className="coursesdiv">
              <div className="imgcourses">
                <img src={course.imgurl} width="100%" height="100%" />
              </div>
              <h2 style={{ margin: "0px", padding: "10px" , textAlign: "center"}}>{course.title}</h2>
              <p
                style={{ padding: "10px", textAlign: "center", margin: "0px" }}
              >
                {course.description.slice(0, 50)}<span style={{color: "gray"}}>...readmore</span>
              </p>
              <div>
                <p style={{ textAlign: "left" , color: "green", fontWeight: "bold"}}>Price &#8377; {course.price}</p>
              </div>
             <Link to={`/courses/${course._id}`}> <button>View Details</button> </Link>
            </div>
          </div>
        ))}
    </div></div>
  );
};

export default Courses;
