import React, {useState,useEffect } from 'react'
 import axios from 'axios'

// import '../css/home.css'
 import { useNavigate } from 'react-router-dom'
    import '../css/home2.css'
function Home() {

const apiurl=import.meta.env.VITE_API_URL;

const [blogdata,setBlogdata]=useState([])
const[hover,setHover]=useState(null)
 const navigate=useNavigate()
 

const viewblog=(blogId)=>{
 navigate(`/viewblog/${blogId}`)
}

useEffect(()=>{
  const getblogData=async()=>{
    try{
    //  const response=await axios.get('http://localhost:7878/blog/getallblogs')
     const response=await axios.get(`${apiurl}/blog/getallblogs`)
    
    console.log(response.data)
    setBlogdata(response.data.data)
    }
    catch(err){
      console.log(err)
    }
  }
  getblogData()
},[])
  
  return (
    <>


    <div className="container-fluid" id='hero-cont'>
      <div className="row" id='hero-row'>
        <div className="col-sm-12 col-md-6 " id='hero-col1'>
          <h1 id='hero-heading'>Share your thoughts with <p>the world</p>  </h1>  
          <p id='hero-para'>Join our community of writers and readers. Discover amazing content or create your own.</p> 

          <button id='hero-btn-1' onClick={()=>{navigate('/shareblog')}}>Start Writing</button>
          <button id='hero-btn-2'>Explore Article</button>
        </div>
      
        <div className="col-sm-12 col-md-6" id='hero-col2'>
          <img src="deskbloghero.jpeg" alt="" className='img-fluid' id='hero-img' />
        </div>
      </div>
    </div>



 
      <div className="container-fluid" id='blog-cont1'>
        <div className="row  " id='blog-row1'>
          
            
             
             {

             Array.isArray(blogdata)&& blogdata.length>0?(
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
            ):(<h1>No blog yet</h1>)
             }
              
            
          </div>
        
      </div> 



  



    </>
  )
}

export default Home