import React, {useState } from 'react'
import '../css/signup.css'
import {useNavigate,NavLink } from 'react-router-dom'

import {toast} from 'react-hot-toast'
import { getmethunk, loginthunk } from './redux/features/userAuthSlice'
import {useDispatch,useSelector} from 'react-redux';
import Loader from './loader'
// import {}


function Login() {
 
const [passhide,setpasshide]=useState(false) 
const navigate=useNavigate()
const dispatch=useDispatch()

const {loading}=useSelector((state)=>state.userAuth)
const data={
  email:"",
  password:""
}
const[formdata,setFormdata]=useState(data)


const handleinput=(e)=>{
 setFormdata({...formdata,[e.target.name]:e.target.value})
 
 
}

const submitdata=async(e)=>{
  e.preventDefault()
  try{
     
    const res=await dispatch(loginthunk(formdata)).unwrap()
   dispatch(getmethunk())
    

    toast.success(res.message)
  
  setFormdata({ email:"",password:""})
  navigate('/')
  }
  
  catch(err){
     toast.error(err)
  }

}

  return (
  <>
     
    {loading.loginloading&& <Loader/>}
    <div className="container-fluid formcontainer">
      <form  className='form' onSubmit={submitdata}>
        
        <h1 className="text-center text-primary fw-bold">Welcome Back</h1>

        <label className="form-label mt-3 fw-bold">Email :</label>
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
        
               

        <button type="submit" className="btn mt-4 w-100 bg-success text-light">login</button>

       <div className="mt-4">Don't have account <NavLink  style=
       
       {{fontFamily:"font-family:Poppins, sans-serif",  marginLeft:"7px"}}
        onClick={()=>(navigate('/signup'))}>
          Signup
          </NavLink>
        </div>

      
      </form>
   
   
  </div>
  </>
  )
  
}

export default Login