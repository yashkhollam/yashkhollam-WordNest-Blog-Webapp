
import React, {useEffect} from 'react'
import {toast} from 'react-hot-toast' 
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import '../css/viewblog1.css'
import { useSelector,useDispatch } from 'react-redux'
import { deleteblogthunk, getblogbyIdthunk } from './redux/features/blogdataslice'
import Viewblogskeleton from './skeletoncard/viewblogskeleton'

function Viewblog() {

  const dispatch=useDispatch()

  const navigate=useNavigate()
  const location=useLocation()

  
  
    const {id}=useParams();
    const {blog,loading}=useSelector((state)=>state.blogdata)
    // viewblogloading

    const {user}=useSelector((state)=>state.userAuth)
    useEffect(()=>{
         dispatch(getblogbyIdthunk(id))
        
    },[dispatch,id])
   
   const copylink=()=>{
     console.log("url","http://localhost:5173"+location.pathname,)
   }


    const updateblog=(id)=>{
      console.log("id",id)
     navigate(`/editblog/${id}`)
    }

    const deleteblog=async(id)=>{
      
       console.log("id",id)
      try{
          
       const res=await dispatch(deleteblogthunk(id)).unwrap()
      
       toast.success(res.message)
       navigate('/',{replace:true})
      }
     catch(err){
      console.log(err)
      toast.error(err)
     }
     
    }


    const date=new Date(blog?.createdAt)
    const formatedDate=date.toLocaleDateString('en-GB',{
      day:"numeric",
      month:"short",
      year:"numeric"
    })


  return (
    <>
     {/* <div className="container-fluid view-blog-container" >
       <div className="row viewblog-row" >
       <div className="col-12 " id='blogdata-container'>
        
       {
          
          
           <div className="div p-2 d-flex gap-4 justify-content-end">
          <button className='btn bg-warning  fs-5 m-2' onClick={()=>gotoedit(blog?._id)}>Edit</button>
           
           <button className='btn bg-danger text-light fs-5 m-2' onClick={()=>{deleteblog(blog?._id)}}>Delete</button>
        </div>
           
       }
       
         
          <div  id='blog-data'>
            <img src={blog?.imgurl} alt="" srcset="" id='blog-image'/>
          </div>


        <div className="blogdata-cont">
          <span className='blogdata-label'>Title :</span>
          <span className='blogdata-data'>{blog?.title}</span>

          <span className='blogdata-label'>Category :</span>
          <span className='blogdata-data'>{blog?.category}</span>

          <span  className='blogdata-label'>Description :</span>
          <span className='blogdata-data' >{blog?.description}</span>

         
        </div>

       </div> 
        </div>
     </div> */}


      {
           loading.viewblogloading || !blog ? (<Viewblogskeleton/>)
          :

    <div className="container-fluid blogdata_container">
         <div className="blogdatawrapper">

       
        
             <h1 className='blogtitle'>{blog?.title?.toUpperCase()}</h1>

            <div className='blogheadercontainaer'>
                <h4 className='p-0 m-0 blogheading'>Author: {blog?.author}</h4>
                <h4 className='p-0 m-0 blogheading'>Upload At: {formatedDate}</h4>
            </div>

            <img src={blog?.imgurl}
             alt="blogimg"
             className='blog-img' />

             <div>
              <label className='blogdescheading'>Blog Description :</label>
               <p className='blogdescription'>{blog?.description}</p>
             </div>
         
          <div  className=' d-flex gap-3 justify-content-center'>
            <button className='btn bg-primary fw-bold text-light' onClick={copylink}>Share blog</button>
            
            {  
              user?.id===blog?.createdBy &&
              <>
                 <button className='btn bg-warning fw-bold text-light'
              onClick={()=>updateblog(blog?._id)}
            >Update</button>

            <button className='btn btn-danger fw-bold text-light'
            onClick={()=>deleteblog(blog?._id)} >Delete</button>
              </>
               
              
            }
            
          </div>
          

          
         </div>
    </div>
}






  
</>

  )
}

export default Viewblog

