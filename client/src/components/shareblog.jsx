import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import {useDispatch,useSelector} from 'react-redux'
import '../css/shareblog.css'
import { createblogthunk } from './redux/features/blogdataslice'
import Loader from '../components/loader.jsx'

function Shareblogs() {

  const {loading}=useSelector((state)=>state.blogdata)
 const dispatch=useDispatch()
const data={title:"",category:"",description:"",image:""}

  const[formdata,setFormdata]=useState(data)
  const [imgpreview,setImgpreview]=useState(null)
  
 
  
  const handleformdata=(e)=>{
   const{name,value,files}=e.target;
    
     
    
    if(name==="image"){
       const image=URL.createObjectURL(files[0])
       setImgpreview(image)
       setFormdata({...formdata,image:files[0]}) 
    }
    else{
      setFormdata({...formdata,[name]:value})
    }

    // console.log({...formdata,[name]:value})
    
  }
  
 

  const submitform=async(e)=>{
    e.preventDefault();
    try{
     
        
         const form=new FormData();
        form.append("title",formdata.title)
        form.append("category",formdata.category)
        form.append('description',formdata.description )
        form.append('image',formdata.image)
        
        console.log("inputdata",form)
        
      const res= await dispatch(createblogthunk(form)).unwrap()
      
        toast.success(res.message)
      
      
       
       
       
        setImgpreview(null)
        setFormdata({title:"",category:"",description:"",image:""})
       

        
    }
    catch(err){
      
      toast.error(err)
    }
    
  }

  return (
   <>

     {loading.createblogloading && <Loader/>}

     
     <div className="container-fluid  min-vh-100" id='container1' >
      <div className="row w-100" style={{maxWidth:"1000px"}}zz>
        <div className="col-12">
            <form className='form ' id='form' onSubmit={submitform}>
              
              <div className='' id='data'>
                <label className='formlabel'>Title :</label>

                <input type="text"
                        className='form-control'
                        id='formdatatext'
                        onChange={handleformdata}
                        name='title'
                        value={formdata.title}/>
              </div> 


              <div className='' id='data' >
                <label className='formlabel' >Category :</label>

                <select name="category"
                         value={formdata.category}
                       id='formdatatext'
                       className='form-select'
                       onChange={handleformdata}
                       >
                    <option value="">select a Category</option>     
                  <option value="Destination">Destination</option>
                   <option value="Lifestyle">Lifestyle</option>
                    <option value="Culinary">Culinary</option>
                     <option value="Tips&Hacks">Tips&Hacks</option>
                      <option value="Food">Food</option>
                        <option value="Tech">Tech</option>
                </select>
              </div> 


              <div className='' id='data' >
                <label className='formlabel' >Description :</label>

                <textarea type="text"
                       className='form-control'
                         id='formdatatext'
                        style={{height:"100px"}}
                        onChange={handleformdata}
                        name='description'
                        value={formdata.description } />
              </div> 


              <div id='data'>
               <label htmlFor="" className='formlabel ' >file :</label>
                
                <div className='d-flex align-items-center gap-5'>
                        <img src={imgpreview} 
              alt="img preview"
              style={{height:"100px",
                      width:"100px",
                      border:"2px solid black"}} />
               
               <input type="file"
                      onChange={handleformdata}
                      name='image'
                      id='imginput'
                      accept='image/*'
                    
                      className='d-none'
                       />
              <label htmlFor="imginput"
                      style={{fontSize:"80px"}}>📂</label>
                </div>
            
              </div>
            <div className='d-flex  justify-content-center'id='postbtn-container'>
                <button type='submit' className='btn' id='postbtn'>Post</button>
            </div>
            

            </form>
        </div>
      </div>
     </div>
   </>
  )
}

export default Shareblogs