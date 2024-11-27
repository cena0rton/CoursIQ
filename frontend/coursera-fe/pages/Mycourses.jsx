import React ,{useState, useEffect} from 'react'
import axios from "axios" ;

const Mycourses = () => {

 const [data, setdata] = useState([]);
 const [view, setview] = useState(false);
useEffect(() => {
  async function res () {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/users/mycourses",
      {
        headers: {
          token: token
        }
      }
    );
    if(response.data){
      setview(prev => !prev);
      setdata(...data, response.data);
    }
    console.log(response.data);
  } res()}, [])
  
  return (
    <div>
      {view && <p>{data}</p>}
    </div>
  )
}

export default Mycourses
