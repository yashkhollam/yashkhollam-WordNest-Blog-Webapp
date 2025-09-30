import React, { useState } from "react";
import "../css/signup.css";
//import signup from '../assets/signup.jpeg'
import{Link, NavLink, useNavigate} from 'react-router-dom'
import  axios from 'axios'
 import {toast} from 'react-hot-toast'
import image from '../assets/signupimg.jpg'


function Signup() {
  const data = {
    username: "",
    email: "",
    password: "",
  };
  const [input, setInput] = useState(data);

  const navigate=useNavigate()

  const handleinput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log({ ...input, [e.target.name]: e.target.value });
  };

  const submitdata=async(e)=>{
  e.preventDefault();
   try{
   
     const response=await axios.post(`http://localhost:7878/auth/signup` 
      ,input)

    toast.success("Signup Successfully")
     setInput({username: "",email: "",password: ""})
     const result=response.data
  
     console.log(result);
     const{success,message}=result
     console.log(message)
     toast.success(message)
      setTimeout(()=>{
        navigate('/login')
      },3000)
  
    }
   

    
   
   catch(err){
    toast.error(err.response.data.message||"Someting went wrong")
   } 
   }

  
  

  return (
    <>
<div className="container-fluid " id="signup-cont">
  <div className="row mt-5" id="signup-row">
    <div className="col-12" id="signup-col">
      <h1 id="heading">Create Account</h1>
     
     
      <form  id="sigup-form" onSubmit={submitdata}>
        <label className="form-label">Username :</label>
        <input type="text" className="form-control" name="username" value={input.username} onChange={handleinput} />

        <label className="form-label mt-3">Email :</label>
        <input type="email" className="form-control" name="email" value={input.email} onChange={handleinput} />

        <label className="form-label mt-3">Password :</label>
        <input type="password" className="form-control" name="password" value={input.password} onChange={handleinput} />

        <button type="submit" className="btn mt-4 w-100" id="form-signupbtn">Sign Up</button>

       <span className="">Already have account <NavLink  style={{fontFamily:"font-family:Poppins, sans-serif",marginLeft:"7px"}}  onClick={()=>(navigate('/login'))}>Login</NavLink></span>
      </form>
   
   
    </div>
  </div>
</div>
    </>
  );
}

export default Signup;
