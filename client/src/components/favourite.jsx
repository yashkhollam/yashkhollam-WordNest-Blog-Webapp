import React from 'react';
import {useSelector} from 'react-redux'
import "../css/home2.css";



function Favourite() {

const {favourite,error,loading}=useSelector((state)=>state.favoriteblog)


 if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
     <div className="container-fluid" id="blog-cont1">
        <div className="row  " id="blog-row1">
          {Array.isArray(favourite) && favourite.length > 0 ? (
            favourite.map((data, index) => (
              <div className=" " key={data._id} id="blog-container1">
                <div className="card " id="blog-card1" key={data._id}>
                  <img
                    src={data.imgurl}
                    alt="blogimg"
                    className="img-fluid"
                    id="blogimg1"
                  />

                  <p className="cardtext" id="card-createddata1">
                    {data.createddata}
                  </p>
                  <p className="cardtitle" id="card-title1">
                    {data.title}
                  </p>
                  <p className="cardtext" id="card-description1">
                    {data.description.slice(0, 100)}
                  </p>

                  <div id="author-cont1">
                    <p className="m-0 p-0" id="author-label">
                      author :
                    </p>
                    <p className="m-0 p-0" id="author-name">
                      {data.author.toUpperCase()}
                    </p>
                  </div>

                  {/* <div
                    onMouseEnter={() => setHover(data._id)}
                    onMouseLeave={() => {
                      setHover(null);
                    }}
                    id="viewbtn1"
                  >
                    {hover === data._id ? (
                      <i
                        class="bi bi-eye-fill"
                        onClick={() => {
                          viewblog(data._id);
                        }}
                      ></i>
                    ) : (
                      <i class="bi bi-eye" id=""></i>
                    )}
                  </div> */}

                  {/* <div className="favirotecontainer">
                    {isfavorite.includes(data._id) ? (
                      <i
                        className="bi bi-arrow-through-heart"
                        onClick={() => {
                          removetofavorite(data._id);
                        }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-heart"
                        onClick={() => {
                          addtofavorite(data._id);
                        }}
                      ></i>
                    )}
                  </div> */}
                </div>

                {/* <div className='favirotecontainer'>
                    
                  </div> */}
              </div>
            ))
          ) : (
            <h1>No   Favourite blog yet</h1>
          )}
        </div>
      </div>
  )
}

export default Favourite