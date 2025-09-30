import React, { useContext, useState } from 'react'
import '../css/signup.css'
import { Link, useNavigate,NavLink } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { AuthContext } from './AuthProvider'


function Login() {
 
  const apiurl=import.meta.env.VITE_API_URL;

  const {setAuth}=useContext(AuthContext)
const navigate=useNavigate()

const data={
  email:"",
  password:""
}
const[input,setinput]=useState(data)

const handleinput=(e)=>{
 setinput({...input,[e.target.name]:e.target.value})
 console.log({...input,[e.target.name]:e.target.value});
 
}

const submitdata=async(e)=>{
  e.preventDefault()
  try{
     
     const response=await axios.post(`${apiurl}/auth/login`,input)
     

  const result=response.data
   console.log(result)
  const{message,username,jwttoken,userId}=result
  console.log(result)
  toast.success(message);
  localStorage.setItem('token',jwttoken);
  localStorage.setItem('username',username);
  localStorage.setItem('userId',userId);

   setAuth({
    username:username,
    token:jwttoken,
    userId:userId
   })
  
  setinput({ email:"",password:""})
  navigate('/')
  }
  
  catch(err){
    console.log(err)
    toast.error(err.response.data.message)
  }
}

  return (
    <div className="container-fluid " id="signup-cont">
  <div className="row mt-5" id="signup-row">
    <div className="col-12" id="signup-col">
      <h1 id="heading">Login</h1>
     
     
      <form  id="sigup-form" onSubmit={submitdata}>
        

        <label className="form-label ">Email :</label>
        <input type="email" className="form-control" name="email" value={input.email} onChange={handleinput} />

        <label className="form-label mt-3">Password :</label>
        <input type="password" className="form-control" name="password" value={input.password} onChange={handleinput} />

        <button type="submit" className="btn mt-4 w-100" id="form-signupbtn">login</button>

       <span className="">Don't have account <NavLink  style={{fontFamily:"font-family:Poppins, sans-serif",marginLeft:"7px"}}  onClick={()=>(navigate('/signup'))}>Signup</NavLink></span>
      </form>
   
   
    </div>
  </div>
</div>
  )
}

export default Login