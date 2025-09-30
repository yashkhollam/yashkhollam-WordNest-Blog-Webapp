import axios from 'axios'
import React, {  useContext,useEffect,useState } from 'react'
import {toast} from 'react-hot-toast' 
import { useNavigate, useParams } from 'react-router-dom'
import '../css/viewblog1.css'
 import { AuthContext } from "./AuthProvider";

function Viewblog() {

  const apiurl=import.meta.env.VITE_API_URL;

  const navigate=useNavigate()
  const {auth}=useContext(AuthContext);
    const [blog,setBlog]=useState([])
    const {id}=useParams();
     const[userId,setUserId]=useState()

    console.log(auth.userId)

    useEffect(()=>{
        const viewBlog=async()=>{
          try{
            // const response=await axios.get(`http://localhost:7878/blog/viewblog/${id}`)

             const response=await axios.get(`${apiurl}/blog/viewblog/${id}`)
           
            console.log(response.data.data)
            const result=response.data.data;
            const {createdBy}=result;
            setUserId(createdBy)
            
           
             setBlog(response.data.data)
        }
         catch(err){
        toast.error("Faild to fetch teh blog")
      }
      }
     
        viewBlog()
    },[id])
    const gotoedit=(blogId)=>{
      navigate(`/editblog/${blogId}`)
    }

    const deleteblog=async(blogId)=>{
      await axios.delete(`http://localhost:7878/blog/deleteblog/${blogId}`)
       
      setBlog(prev=>prev.filter((item)=>item._id!==blogId))
       toast.success("Blog deleted successfully")
     
    }

  return (
    <>
     <div className="container-fluid " id='view-blog-container'>
       <div className="row" id='viewblog-row'>
        
 
     
         
          <div className="col-12 col-md-8 " id='blogdata-container'>
        
       {
          auth.userId===userId?
           (
           <div className="div p-2 d-flex gap-4 justify-content-end">
          <button className='btn bg-warning  fs-5 m-2' onClick={()=>gotoedit(blog._id)}>Edit</button>
           <button className='btn bg-danger text-light fs-5 m-2' onClick={()=>{deleteblog(blog._id)}}>Delete</button>
        </div>
           ):("")
       }
       
         
          <div  id='blog-data'>
            <img src={blog.imgurl} alt="" srcset="" id='blog-image'/>
          </div>


        <div className="blogdata-cont">
          <span className='blogdata-label'>Title :</span>
          <span className='blogdata-data'>{blog.title}</span>

          <span className='blogdata-label'>Category :</span>
          <span className='blogdata-data'>{blog.category}</span>

          <span  className='blogdata-label'>Description :</span>
          <span className='blogdata-data'>{blog.description}</span>

          {/* <span></span> */}
        </div>

       </div> 
        
        <div className="col-12 col-md-4 border" id='blogcomment-container'>comment

          
         </div>

       

 
         
        </div>
     </div>
    </>
  )
}

export default Viewblog

