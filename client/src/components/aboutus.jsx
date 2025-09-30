import React from 'react'
import '../css/aboutus.css'
import {useNavigate} from 'react-router-dom'

function Aboutus() {
  
  const navigate=useNavigate()

  return (

    <>
      <div className="container-fluid " id='about-cont'>
      <div className="row" id='about-row'>
         <span id='welcome_msg'>Welcome to <p>WordNest</p>  – a space to share your stories and explore ideas.</span>
        <div className="col-12 col-md-6 " id='col-info'>

       

       <h1 id='abotus-heading'>
        Our Mission :
       </h1>

       <div id='mission'>
        <span>👉🏻</span>
        <span>Provide a platform where everyone can share their blogs freely.</span>
        <span>👉🏻</span>
        <span>Connect people through stories, knowledge, and experiences.</span>
        <span>👉🏻</span>
        <span>Inspire readers and creators to learn from one another.</span>
       </div>
       
       
        </div>
      
      
        <div className="col-12 col-md-6 " id='col-img'>
          <img className='img-fluid  rounded' src="1000_F_360262037_7rwUYLm6j89qK9PZRudbLRZNr3M8FeqC.jpg" alt="" />
          </div>

         
      </div>
    </div>
    


    <div className="container-fluid " id='vision-cont'>
      <div className="row" id='about-row'>

      
        <div className="col-12 col-md-6">
          <img src="we-offer-rubber-stamp-seal-vector.jpg" alt="" className='img-fluid border' id='offerimg'/>
        </div>
        <div className="col-12 col-lg-6">

          <h1 id='abotus-heading' className='text-warning'>We Offer</h1>
         <div id='mission'>
        <span>🌟</span>
        <span>A community-driven platform where anyone can post their blogs.</span>
        <span>🌟</span>
        <span>A variety of categories to explore, from technology and lifestyle to travel and food.</span>
        <span>🌟</span>
        <span>A friendly space to express yourself and engage with like-minded readers.</span>
       </div>
       
        </div>
      </div>
    </div>

    <div className="container-fluid " id='about-cont'>
      <div className="row" id='about-row'>
       
        <div className="col-12 col-md-6 " id='col-info'>

       

       <h1 id='abotus-heading'>
        Our Vision :
       </h1>

       <div id='mission'>
        <span>👁️</span>
        <span>A community where every voice is valued.</span>
        <span>👁️</span>
        <span>A platform that inspires creativity and learning.</span>
        <span>👁️</span>
        <span>A space that connects people through stories.</span>
       </div>
       
       
        </div>
      
      
        <div className="col-12 col-md-6 " id='col-img'>
          <img className='img-fluid  rounded' src="447231_712259.webp" alt=""  id='vision-img'/>
          </div>

         
      </div>
    </div>

    <div className="continer-fluid mt-5">
      <div className="row" id='about-row'>
        <div className="col-12">
          <h1 id='join-text'>Join WordNest today, share your story, explore others’ experiences,<br /> and be part of a growing community that celebrates the art of blogging.</h1>


          <button id='joinbtn' onClick={()=>navigate('/signup')}>Join now</button>
        </div>
      </div>
    </div>


    <div className="container-fluid" id='footer'>
      <div className="row">
        <div className="col-12">
          <h1 className=' mt-4'id='follow'>Follow On</h1> 

          <div id='icon-cont'>
            <i className="bi bi-github" id='icon'></i>
            <i className="bi bi-instagram" id='icon'></i>
            <i className="bi bi-youtube" id='icon'></i>
          </div>
        </div>
      </div>
    </div>
   
   
    </>
    

  
  )
}

export default Aboutus