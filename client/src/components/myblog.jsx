import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import '../css/myblogs.css'
import {toast} from 'react-hot-toast';
import { data, useNavigate } from 'react-router-dom';


function Myblogs() {

  const apiurl=import.meta.env.VITE_API_URL;

const {auth}=useContext(AuthContext)
 const[blogdata,setblogData]=useState([])
 const[loading,setLoading]=useState(false)
 const [hover,setHover]=useState(null)

  useEffect(()=>{
  
    const fetchdatabuId=async()=>{
      try{
       
     
      const response=await axios.get(`${apiurl}/blog/myblogs`
        ,{
        headers:{
          Authorization:`Bearer ${auth.token}`
        }
       })
       
      console.log(response.data.data)
      setblogData(response.data.data)
    }

    catch(err){
    console.log(err)
  }

  finally{
      setLoading(false) 
    }
  };
  
  fetchdatabuId();
  },[auth])

  const navigate=useNavigate()

  const viewblog=(blogId)=>{
    navigate(`/viewblog/${blogId}`)
  }



  return(
    <>

   
        {loading && (
          <div id="spinner-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
            
      <div className="container-fluid " id='blogcontainer'>
        <div className="row w-100" id='row-con'>
        
             
             { 
              

             !loading && Array.isArray(blogdata)&& blogdata.length>0?(
              blogdata.map((data,index)=>(
                
                
                 <div className=" " key={data._id} id='blog-container1'>

                  <div className="card " id='blog-card1' key={data._id}>
                     <img src={data.imgurl} alt="blogimg" className='img-fluid' id='blogimg1'/>
                  
                   <p className='cardtext' id='card-createddata1'>{data.createddata}</p>
                  <p className='cardtitle' id='card-title1'>{data.title}</p>
                  <p className='cardtext' id='card-description1'>{data.description.slice(0,100)}</p>

                  <div id="author-cont1">
                    <p className='m-0 p-0' id='author-label'>author :</p>
                    <p className='m-0 p-0' id='author-name'>{data.author.toUpperCase()}</p>

                  </div>
               

                <div 
                    onMouseEnter={()=>setHover(data._id)} 
                    onMouseLeave={()=>{setHover(null)}} 
                    id='viewbtn1'>

                  {hover===data._id 
                  ?<i class="bi bi-eye-fill" onClick={()=>{viewblog(data._id)}}></i>
                  :<i class="bi bi-eye" id='' ></i>}
                  </div> 
                  
                  
                  </div>
                
                  
                 
              
               
              
                </div>
              ))
            ):(  !loading&&<h1>No blog yet</h1>)
             }
              
            
          </div>
        
      </div>
    </>
  )
}

export default Myblogs;
