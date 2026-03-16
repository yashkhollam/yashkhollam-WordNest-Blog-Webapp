import React, { useState ,useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getFavouriteblogthunk, removeFavouriteblogthunk } from './redux/features/favouriteblogslice';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import '../css/cards.css'
import Blogskeletonecard from './skeletoncard/blogskeletonecard';


function Favourite() {

const {favourite,loading}=useSelector((state)=>state.favouriteblog)
const {user}=useSelector((state)=>state.userAuth)

  
const dispatch=useDispatch();


useEffect(()=>{
   dispatch(getFavouriteblogthunk())
},[dispatch,user])
  

const navigate = useNavigate();

const viewblog = (blogId) => {
  navigate(`/viewblog/${blogId}`);
};
   
const removefavourite=async(blogId)=>{
  try{
    console.log("blogid",blogId)
     const res=await dispatch(removeFavouriteblogthunk(blogId)).unwrap()

     toast((res.message),{
      icon:"🗑️"
     })
  }
  catch(err){
     console.log(err)
     toast.error(err)
  }
}
 

const formatedDate=[]

 for ( let blog of favourite){

  const data=new Date(blog.createdAt)
   formatedDate.push(data.toLocaleDateString('en-GB',{
    day:"2-digit",
    month:"short",
    year:"numeric"
   }))
  }


  return (

    <>
     <div className="container-fluid  blogcardcontainer" 
          style={{marginTop:"90px"}}>
        <div className="row blog_row" >

           <h1 style={{fontFamily:"cursive",textAlign:"center",fontWeight:"bold"}}>Our Favourites ❤️</h1>



         
          
          <div className='card_warpper'>

             {
            loading.getallfavouriteloading ? (
             new Array(3).fill(3).map(()=>(
              <div>
                 <Blogskeletonecard/>
                
              </div>
             ))
           
          )
            :

                favourite.length > 0 ? (
            favourite.map((data, index) => (
               <div className="blog_card" key={data._id}>
                  
                  <div className="uppercontainer">
                     <p className="card_createddata">
                    {formatedDate[index]}
                  </p>

                     <div className="favouritecontainer">
                    
                   
                      <i
                        className="bi bi-heart-fill  fs-4"
                        style={{color:"red"}}
                        onClick={() => {
                          removefavourite(data._id);
                        }}
                     
                      ></i>
                   
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
            <h1>No Favourite blog yet</h1>
          )}
          </div>
         
        </div>
      </div>
    </>
     
  )
}

export default Favourite