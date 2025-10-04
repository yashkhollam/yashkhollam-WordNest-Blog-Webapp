
import "../css/navbar2.css";
import { useState,useContext } from "react";

import {  NavLink, Outlet, useNavigate } from "react-router-dom";
 import { AuthContext } from "./AuthProvider";

function Navbar() {
   const {auth,logout}=useContext(AuthContext)
  
   const [isopen,setisopen]=useState(false);
 
  const handelnavbar = () => {
    setisopen(!isopen);
    console.log(isopen)
    
   };

  const navigate=useNavigate()
 

  
  return (
    <>
      


    <div className="continer-fluid" id="nav-container">
     

    
      <div className="row" id="nav-row" >
       
       
      
     

      <div className="col-12 " id="list-cont">
        
      {
        auth.username ?(
           <h3 id="logo" onClick={()=>navigate('/')}>WELCOME <p id="username" className="ms-2 ">{auth.username.toUpperCase()}</p> </h3>
        ):(
          <h3 id="logo" onClick={()=>navigate('/')}>Welcome</h3>
        )
      }

       
         
          <i className="bi bi-list hamburger" onClick={handelnavbar}></i>
              
               <ul  className={`group-items ${isopen ? "mobilecss":" "} `}>
                
              <li>
                <input type="text"
                       className="form-control"
                        />
              </li>
               <NavLink to="/aboutus" style={{textDecoration:"none",color:"black"}} ><li onClick={handelnavbar}>Aboutus  </li></NavLink>
                <li onClick={handelnavbar}>Favourite</li>

                {
                  auth.username ?(
                    <>
                    <li onClick={()=>navigate('/myblogs')}>My blogs</li>  
                   <li onClick={logout}>logout</li>
                    </>
                  
                  ):(
                    
                      <>

                       <li id="signinbtn" onClick={()=>navigate('/login')}>signin</li>

                       
              <li id="signupbtn" onClick={()=>navigate('/signup')}>signup</li>
                    
                      </>
                      
                     
                  )

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
