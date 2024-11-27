import React,{useEffect, useState} from 'react';
import  { useParams } from "react-router-dom";
import axios from "axios";
import Courses from "../pages/Courses"
const Coursedetails = () => {
    const [course, setCourse] = useState([]);
    const [admin, setAdmin] = useState({});
    const { courseId } = useParams();
    console.log(courseId);
useEffect(() =>{
    async function fetchcourses(){
        try {
            const response = await axios.post(`http://localhost:3000/users/courses/${courseId}`);
            setCourse(response.data.course);
            console.log(response.data.course);
            setAdmin(response.data.admin);
            console.log(course.description);
        } catch (error) {
            console.error("Error fetching course details:", error);
        }}
        fetchcourses()
    },[courseId]);

  return (
      <div>
    <div className="viewdetails">

        <img src={course.imgurl}/>
        <div className="innerviewdetails">
      <h1>{course.title}</h1>
      <h4>{course.description}</h4>
      <p>Price &#8377; {course.price}</p>
      <p>{`Course Instructor: ${admin.firstname} ${admin.lastname}`}</p>
      <button>Buy This Course</button>
      </div>
      </div> 
    </div>
  )
}

export default Coursedetails
