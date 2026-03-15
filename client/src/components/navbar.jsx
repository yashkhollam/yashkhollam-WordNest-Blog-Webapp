
import "../css/navbar2.css";
import { useState} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {  NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutthunk } from "./redux/features/userAuthSlice";
import {toast} from 'react-hot-toast'
import { setLogoutUser } from "./redux/features/favouriteblogslice";
// import { useEffect } from "react";

function Navbar() {

 const dispatch=useDispatch()
 const {user,isAuthenticated}=useSelector((state)=>state.userAuth)
//  const {favourite}=useSelector((state)=>state.favouriteblog)
   const [isopen,setisopen]=useState(false);
 
  const handelnavbar = () => {
    setisopen(!isopen);
  
    
   };

  const navigate=useNavigate()

  const navigatetoblogs=()=>{
     navigate ('myblogs')
     setisopen(!isopen)
  }
 

  const logout=async()=>{
     try{
          const res=await dispatch(logoutthunk(user)).unwrap()
           dispatch(setLogoutUser(null))
          setisopen(!isopen);
          toast.success(res.message)
     }

     catch(err){
       console.log(err.message)
       toast.error(err)
     }
  }
  
  return (
    <>
      


    <div className="continer-fluid" id="nav-container">
       <div className="row" id="nav-row" >
          <div className="col-12 " id="list-cont">
        
      
          {
            isAuthenticated  ? 
             <h3 id="logo" onClick={()=>navigate('/')}>WELCOME
              <p id="username" className="ms-2 ">{user?.name?.toUpperCase()}</p> 
           
            </h3>
            :  <h3 id="logo" onClick={()=>navigate('/')}>Welcome</h3>
          }
          

      
         
            <i className="bi bi-list hamburger" onClick={handelnavbar}></i>
              
               <ul  className={`group-items ${isopen ? "mobilecss":" "} `}>
                
                <li onClick={handelnavbar}>
               <NavLink to="/aboutus" style={{textDecoration:"none",color:"black"}} >
               
              Aboutus  
               
               </NavLink></li>
               

              
                {
                   isAuthenticated ?
                   <>
                       <li onClick={handelnavbar}>
                        <NavLink to="/favourite" style={{textDecoration:"none",color:"black"}}> Favourite</NavLink></li>

                       <li onClick={navigatetoblogs}>My blogs</li>  
                        <button onClick={logout} className="btn btn-outline-danger">logout</button>
                   </>
                   :
                       <li id="signinbtn" onClick={()=>{navigate('/login'),setisopen(!isopen)}}>signin</li>   
                  
                }
                 
     
             
              </ul>  
        </div>
       </div>
      </div>

     
    
      <Outlet />
    </>
  );
}

export default Navbar;
