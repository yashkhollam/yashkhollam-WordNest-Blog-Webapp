
// import {toast} from 'react-hot-toast'


import '../css/shareblog.css'
import { useState,useEffect ,useRef} from 'react'
import { useParams } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import {useDispatch,useSelector} from 'react-redux'
import { getblogbyIdthunk,updateblogthunk } from './redux/features/blogdataslice'



function EditBlog() {

  
 const {id}=useParams()
const dispatch=useDispatch();
const {blog,loading}=useSelector((state)=>state.blogdata)
const [imgpreview,setImgpreview]=useState(null)

const data={
  title:"",
  category:"",
  description:"",
  image:null,
  imgurl:""
  
}
const [formdata,setFormdata]=useState(data)

const handleinput=(e)=>{
  // console.log({...input,[e.target.name]:e.target.value})

 const {files,name,value}=e.target
if(name==="image"){
  const imgurl=URL.createObjectURL(files[0])
  setImgpreview(imgurl)
  setFormdata({...formdata,[name]:files[0]})
  
}
else{
  setFormdata({...formdata,[name]:value})
}

}




useEffect(()=>{
      dispatch(getblogbyIdthunk(id))
},[dispatch,id])


useEffect(()=>{
  if(blog){
     setFormdata({
       title:blog?.title,
  category:blog?.category,
  description:blog?.description,
  image:blog?.imgurl

     })
     setImgpreview(blog?.imgurl)

    
  }
},[blog])


const refrence=useRef()

 const updateblog=async(e)=>{
  e.preventDefault()
    try{
      console.log("id",id)
   
      const form=new FormData()

      form.append('title',formdata?.title)
      form.append('category',formdata?.category)
      form.append('description',formdata?.description)

      if(formdata?.image){
         form.append('image',formdata?.image)
      }
     
     
    const res=await dispatch(updateblogthunk({id,form})).unwrap()
    toast.success(res.message)
   
    
      setFormdata({title:"",category:"",description:"",image:null,
    
})
setImgpreview(null)

    }
    catch(err){
      console.log(err)
    }
 }
  
  return (
   <>

    
     <div className="container-fluid  min-vh-100" id='container1' >
      <div className="row w-100 " style={{maxWidth:"1000px"}}>
        <div className="col-12">

          <h1 className='text-center pb-4' style={{color:"#374151"}}>Update Blog</h1>
            <form className='form ' id='form' onSubmit={updateblog}>
              
              <div className='' id='data'>
                <label className='form-label fs-3 ms-3' id='formlabel'>Title :</label>

                <input type="text"
                       className='form-control'
                        id='inputtext'
                        name='title'
                        value={formdata?.title}
                        onChange={handleinput}
                       />
              </div> 


              <div className='' id='data' >
                <label className='form-label fs-3 ms-3' id='formlabel'>Category :</label>

                <select name="category"
                          id='inputtext' 
                       className='form-select'
                       value={formdata?.category}
                        onChange={handleinput}
                       
                      
                       >
                    

                  <option value="Destination">Destination</option>
                   <option value="Lifestyle">Lifestyle</option>
                    <option value="Culinary">Culinary</option>
                     <option value="Tips&Hacks">Tips&Hacks</option>
                      <option value="Food">Food</option>
                        <option value="Tech">Tech</option>
                </select>
              </div> 


              <div className='' id='data'>
                <label className='form-label fs-3 ms-3' id='formlabel'>Description :</label>

                <textarea 
                          className='form-control'
                          type="text"
                            id='inputtext'
                        style={{height:"100px"}}
                          name="description"
                          value={formdata?.description}
                          onChange={handleinput}
                          ></textarea>

              </div> 


              <div id='data'>
               <label htmlFor="" className='form-label fs-3 ms-3' id='formlabel'>file :</label>

              <img src={imgpreview}
               alt=""
                style={{height:"100px",width:"100px"}} />

               <input type="file"  
                      name='image'
                      id='inputtext'
                      accept='image/*'
                       onChange={handleinput}
                      
                      
  
                       />
              

              </div>
            <div className='d-flex  justify-content-center'id='postbtn-container'>
                <button 
                type='submit'
                className='btn'
                id='postbtn'
                >Update</button>
            </div>
            

            </form>
        </div>
      </div>
     </div>
   </>
  )
}

export default EditBlog