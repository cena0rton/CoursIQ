import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [formdata , setFormdata] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");  

    const handleonchange = (e) => {
       const { name, value } = e.target;
       setFormdata({...formdata , [name]: value});
    }

    const onSubmit= async() => {

        const {email, password, firstname, lastname} = formdata;

        if(!email || !password || !firstname || !lastname){
           return setError("All feilds are required")
        }

        try{
            const response = await axios.post("http://localhost:3000/users/signup", {
                firstname, lastname, email, password
            });
            console.log(response.data);
            if(response.status === 200 || response.status === 201){
                alert("You are Signed Up Redirecting to Login Page");
                navigate("/login");
            }
        }catch(e){
            console.log(e)
            setError( e.response?.data?.message || "An Error Occured")
        }
    }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10%",
      }}
    >
        <h1 style={{textAlign:"center", marginBottom: "30px"}}>Sign Up</h1>
      <div>
        <input type="text" name="firstname" value={formdata.firstname} onChange={handleonchange} placeholder="First Name"/>
      </div>
      <div>
        <input type="text" name="lastname" value={formdata.lastname} onChange={handleonchange} placeholder="Last Name"/>
      </div>
      <div>
        <input type="email" name="email" value={formdata.email} onChange={handleonchange} placeholder="email@example.com"/>
      </div>
      <div>
        <input type="password" onChange={handleonchange} name="password" value={formdata.password} placeholder="Password"/>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button style={{ width: "320px", marginTop: 30}}onClick={onSubmit}>Sign Up</button>
    </div>
  );
};

export default Signup;
