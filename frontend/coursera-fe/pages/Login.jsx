import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [users, setUser] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("")

    const onchangehandler = (e) => {
        const {name , value} = e.target;
        setUser({
            ...users, [name]: value
        })
    }

    const loginhandler = async () => {

        const {email , password} = users

        if(!email || !password){
            setError("All Feilds are Required")
        }
try {
    const response = await axios.post("http://localhost:3000/users/login", {
        email, password
    });

    if(response.status === 200 || response.status === 201){
        alert("you are now logged In");
        // navigate("/my/courses");
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/mycourses");
    }

} catch (e) {
    setError(e.response?.data?.message || "An Error Occurred")
}
      

    }

  return (

    <div>
        
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "10%",
      }}
    >
        <h1 style={{textAlign:"center", marginBottom: "30px" }}>Login</h1>
      <div>
        <input placeholder="email@example.com" name="email" value={users.email} onChange={onchangehandler}/>
      </div>
      <div>
        <input placeholder="Password" name="password" value={users.password} onChange={onchangehandler}/>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button style={{ width: "320px", marginTop: 30}} onClick={loginhandler}>Log In</button>
    </div>
    </div>
  );
};

export default Login;
