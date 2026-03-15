import React from 'react'
import "../../css/viewblogskeleton.css"


function Viewblogskeleton() {
  return (
   <div>

      <div className="container-fluid blogdata_containerskeleton">
         <div className="blogdatawrapperskeleton">
            <h1 className='blogtitleskeleton'></h1>

            <div className='blogheadercontainaerskeleton'>
                <h4 className='p-0 m-0 blogheadingskeleton'></h4>
                <h4 className='p-0 m-0 blogheadingskeleton'></h4>
            </div>

          <div className='skeletonimg'>

          </div>

             <div>
              <label className='blogdescheadingskeleton'></label>
               <p className='blogdescriptionskeleton'></p>
             </div>
         
         
          
         </div>
    </div>
   </div>
  )
}

export default Viewblogskeleton