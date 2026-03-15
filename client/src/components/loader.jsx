import React from 'react'

function Loader() {
  return (
    
    <>  
         <div style={{
            display:"flex",
            alignItems:"center",
            position:"absolute",
            zIndex:"999",
            justifyContent:"center",
            top:"0",
            bottom:"0",
            backgroundColor:"#0c0b0b48",
            width:"100%",
            height:"100vh"
          

         }}
         role='status'>
    
         <div
           style={{display:"flex",
            alignItems:"center",
            gap:"5px",
           
           fontSize:"16px",
           fontWeight:"bold",
           border:"3px solid black",
           padding:"5px 10px ",
           backgroundColor:"#ffffff",
           borderRadius:"5px"
           }}
          >
                       <div className='spinner-border text-primary active'/>
                       please wait
         </div>

          
         </div>
    </>
  )
}

export default Loader