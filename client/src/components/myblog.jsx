import React, { useEffect, useState } from 'react';

import {useDispatch,useSelector} from 'react-redux'

import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userblogthunk } from './redux/features/blogdataslice';
import '../css/cards.css';
import Blogskeletonecard from './skeletoncard/blogskeletonecard';


function Myblogs() {

  const dispatch=useDispatch()
  const {userblogs,loading}=useSelector((state)=>state.blogdata) 
  

 

 useEffect(()=>{
     dispatch(userblogthunk())
     
 },[dispatch])

  const navigate=useNavigate()

  const viewblog=(blogId)=>{
    navigate(`/viewblog/${blogId}`)
  }

const formatedDate=[]

 for ( let blog of userblogs){
  


  const data=new Date(blog.createdAt)
   formatedDate.push(data.toLocaleDateString('en-GB',{
    day:"2-digit",
    month:"short",
    year:"numeric"
   }))
  }

 

  return(
    <>
 
   
            
     <div className="container-fluid  blogcardcontainer" 
          style={{marginTop:"90px"}}>
        <div className="row blog_row" >

           <h1 style={{fontFamily:"cursive",textAlign:"center",fontWeight:"bold"}}>My Blogs</h1>
        
              <div className="card_warpper">

                {
                   loading.userblogloading ? (
                   
                    new Array(6).fill(8).map(()=>(
                        <div>
                           <Blogskeletonecard/>
                        </div>
                    ))
                  
                  )
                
               :    
              userblogs?.length>0?(
              userblogs.map((data,index)=>(
                
                  <div className="blog_card" key={data._id}>
                  
                  <div className="uppercontainer">
                     <p className="card_createddata">
                    {
                      formatedDate[index]
                    }
                  </p> 

                  </div>
                 

                  <img
                    src={data?.imgurl}
                    alt="blogimg"
                     loading="lazy"
                    className="blogimg"
                  />
 
                  
                      <p className="card-title">
                    {data.title}
                  </p>
                  <p className="card-description">
                    {data.description.slice(0, 100)}....
                  </p>

                  {/* <div className="author_cont">
                    <p className="m-0 p-0 author_label">
                      author :
                    </p>
                    <p className="m-0 p-0 author_name">
                      {data.author.toUpperCase()}
                    </p>
                  </div> */}

                 <button className="viewbtn"
                 onClick={()=>viewblog(data._id)}>View</button>
                 
              </div>
                 
              ))
            ):( <h1>No blog yet</h1>)
             }
              </div>
             
              
              {/*   <div 
                    onMouseEnter={()=>setHover(data._id)} 
                    onMouseLeave={()=>{setHover(null)}} 
                    id='viewbtn1'>

                  {hover===data._id 
                  ?<i class="bi bi-eye-fill" onClick={()=>{viewblog(data._id)}}></i>
                  :<i class="bi bi-eye" id='' ></i>}
                  </div> 
                   */}
            
          </div>
        
      </div>
    </>
  )
}

export default Myblogs;
