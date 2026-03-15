import React, { useState } from "react";
import "../css/signup.css";
//import signup from '../assets/signup.jpeg'
import{NavLink, useNavigate} from 'react-router-dom'
 import {toast} from 'react-hot-toast'

import { signupthunk } from "./redux/features/userAuthSlice";
import { useDispatch,useSelector } from "react-redux";
import Loader from "./loader";


function Signup() {
 
const {loading}=useSelector((state)=>state.userAuth)
 const dispatch=useDispatch()
const [passhide,setpasshide]=useState(false) 
  const data = {
    username: "",
    email: "",
    password: "",
  };

  const [formdata, setFormdata] = useState(data);
  const navigate=useNavigate()

  const handleinput = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
     console.log({ ...formdata, [e.target.name]: e.target.value });
  };

  const submitdata=async(e)=>{
  e.preventDefault();
   try{
   
    const res=await dispatch(signupthunk(formdata)).unwrap() 
    
    toast.success(res.message)
     setFormdata({username: "",email: "",password: ""})
     
      
        navigate('/login')
     
  
    }
   

    
   
   catch(err){
    console.log(err)
     toast.error(err)
   } 

   }

  
  

  return (
    <>
    {loading.signuploading&& <Loader/>}
     
<div className="container-fluid formcontainer">
  
    
     
     
      <form  className="form" onSubmit={submitdata}>
          <h1 className="text-center text-primary fw-bold">Create Account</h1>


        <label className="form-label mt-3 fw-bold">Username :</label>
        
        <input type="text"
               className="form-control"
               name="username" 
               value={formdata.username}
              onChange={handleinput} />

        <label className="form-labelfw-bold mt-3 fw-bold">Email :</label>
        
        <input type="email"
               className="form-control" 
               name="email"
               value={formdata.email}
               onChange={handleinput} />

       <label className="form-label fw-bold mt-3">Password :</label>
        <div className='passoword-wrapper'>
        
        <i className={`bi ${passhide ?"bi-eye":"bi-eye-slash eye-solid "}  eyeicon`}
            onClick={()=>setpasshide(!passhide)}/>   
       
        <input type={passhide ? "password":"text"}
               className="form-control pe-5"
               name="password"
               value={formdata.password}
               onChange={handleinput} />
              
        </div>
        

        <button type="submit"
         className="btn mt-4 w-100 btn mt-4 w-100 bg-success text-light" 
          >Sign Up</button>

       <div className="mt-3">
       
        Already have account 
       
        <NavLink   className='ms-3'
                  onClick={()=>(navigate('/login'))}>
                   
                    Login
          </NavLink></div>
      </form>
   
   
   </div>
    </>
  );
}

export default Signup;
