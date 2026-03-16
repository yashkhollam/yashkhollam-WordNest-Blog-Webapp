import React, { useState, useEffect, useContext } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import "../css/home2.css";
import '../css/cards.css'
import toast from "react-hot-toast";
import {Link} from 'react-scroll'
import {getallblogsthunk} from '../components/redux/features/blogdataslice'
import {addFavouriteblogthunk, getFavouriteblogthunk, removeFavouriteblogthunk } from "./redux/features/favouriteblogslice";
import Blogskeletonecard from "./skeletoncard/blogskeletonecard";




function Home() {
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

   const {favourite}=useSelector((state)=>state.favouriteblog)
  const{allblogs,loading}=useSelector((state)=>state.blogdata)
   const {user}=useSelector((state)=>state.userAuth)
  

const postblog=()=>{
  
    if(!user){
    toast.error("Please login to continue")
  }  
  navigate('/shareblog')
}

  const viewblog = (blogId) => {
    navigate(`/viewblog/${blogId}`);
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
    
  };


  const addtofavorite = async(blogId) => {
     try{
        
         const res=await dispatch(addFavouriteblogthunk(blogId)).unwrap();
           toast((res.message),{
           icon:"❤️❤️"
            })
         }

         catch(err){
          toast.error(err)
         }
       
    
   
  };

  const removetofavourite = async(blogId) => {
   

    const res=await dispatch(removeFavouriteblogthunk(blogId)).unwrap();
     toast((res.message),{
      icon:"💔💔"
    });
  };


  useEffect(()=>{

    if(user){
     dispatch(getFavouriteblogthunk())
    }
    
  },[dispatch,user])


  useEffect(()=>{
     dispatch(getallblogsthunk())
  },[dispatch])

  return (
    <>
     
      <div className="container-fluid " id="hero-cont">
        <div className="row w-100" id="hero-row">
          <div className="col-sm-12 col-md-6 " id="hero-col1">
            <h1 id="hero-heading" >
              Share your thoughts with <p>the world</p>{" "}
            </h1>
            <p id="hero-para">
             Explore, read, and write — connect with ideas that inspire and let your own stories reach the world.
            </p>

            <button id="hero-btn-1" onClick={postblog}
            >
              Start Writing
            </button>
            <button id="hero-btn-2"><Link to="blogcard" duration={100}smooth={true}>Explore Article</Link></button>
          </div>

          <div className="col-sm-12 col-md-6" id="hero-col2">
            <img
              src="deskbloghero.jpeg"
              alt=""
              className="img-fluid"
              id="hero-img"
            />
          </div>
        </div>
      </div>

     
      

      <div className="container-fluid  blogcardcontainer">
        <div className="row blog_row">
         
         <div className="card_warpper">

          {loading.allblogsloading ? (
           
            new Array(8).fill(8).map((_,index)=>(
              <div key={index}>
                  <Blogskeletonecard/>
              </div>
             
            ))
           
          
          ) :

           allblogs?.length > 0 ? (
            allblogs.map((data, index) => (
              
                <div className="blog_card" id="blogcard" key={index}>
                  
                  <div className="uppercontainer">
                     <p className="card_createddata">
                    {new Date(data.createdAt).toLocaleDateString('en-GB',{
                      day:"2-digit",
                      month:"short",
                      year:"numeric"
                    })}
                  </p>

                     <div className="favouritecontainer">
                    
                    {Array.isArray(favourite)&&favourite.some(blog=>blog._id===data._id)? (
                      <i
                        className="bi bi-heart-fill  fs-4"
                        style={{color:"red"}}
                        onClick={() => {
                          removetofavourite(data._id);
                        }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-heart fs-4"
                        onClick={() => {
                          addtofavorite(data._id);
                        }}
                      ></i>
                    )}
                  </div> 

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
          ) : (
            <h1>No blog yet</h1>
          )}

         </div>
        
        </div>
      </div>
    </>
  );
}

export default Home;
