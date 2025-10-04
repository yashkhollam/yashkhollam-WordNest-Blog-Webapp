import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addfavorite, removefavorite } from "./features/favouriteblogslice";
import { useNavigate } from "react-router-dom";
import "../css/home2.css";
import {AuthContext} from '../components/AuthProvider'



function Home() {
  const apiurl = import.meta.env.VITE_API_URL;
  const {auth}=useContext(AuthContext)
  const [blogdata, setBlogdata] = useState([]);
  const [hover, setHover] = useState(null);
  const [isfavorite, setIsfavorite] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewblog = (blogId) => {
    navigate(`/viewblog/${blogId}`);
  };

  useEffect(() => {
    const getblogData = async () => {
      try {
        //  const response=await axios.get('http://localhost:7878/blog/getallblogs')
        const response = await axios.get(`${apiurl}/blog/getallblogs`);

        console.log(response.data);
        setBlogdata(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getblogData();
  }, []);

  const addtofavorite = (blogId) => {
    if (!isfavorite.includes(blogId)) {
      setIsfavorite([...isfavorite, blogId]);
      dispatch(addfavorite({blogId,token:auth.token}));
    }
  };

  const removetofavorite = (blogId) => {
    setIsfavorite(isfavorite.filter((id) => id !== blogId));
     dispatch(removefavorite({blogId,token:auth.token}));
  };

  return (
    <>
      <div className="container-fluid" id="hero-cont">
        <div className="row" id="hero-row">
          <div className="col-sm-12 col-md-6 " id="hero-col1">
            <h1 id="hero-heading">
              Share your thoughts with <p>the world</p>{" "}
            </h1>
            <p id="hero-para">
              Join our community of writers and readers. Discover amazing
              content or create your own.
            </p>

            <button
              id="hero-btn-1"
              onClick={() => {
                navigate("/shareblog");
              }}
            >
              Start Writing
            </button>
            <button id="hero-btn-2">Explore Article</button>
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

      <div className="container-fluid" id="blog-cont1">
        <div className="row  " id="blog-row1">
          {Array.isArray(blogdata) && blogdata.length > 0 ? (
            blogdata.map((data, index) => (
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

                  <div
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
                  </div>

                  <div className="favirotecontainer">
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
                  </div>
                </div>

                {/* <div className='favirotecontainer'>
                    
                  </div> */}
              </div>
            ))
          ) : (
            <h1>No blog yet</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
