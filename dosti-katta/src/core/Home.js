import React, { useEffect, useState } from "react";
import "./style/home.css";
//Packages-----------------
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
//Function importing-----------------
import { isAuthenticated } from "../auth/helper";
import { getAllPost, getMyFollowingPost } from "./helper/PostHelper"
import { searchForUser } from "./helper/UserHelper";
//Components-----------------
import Post from "../components/Post";
import ProfilePhoto from "../components/ProfilePhoto";
import Menu from "./Menu";
import ProfileCard from "./ProfileCard";
//Images-----------------
import dostiKatta from "../dostiKatta.png"

const Home = () => {
  //useState---------------
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);
  const [searchUserData, setsearchUserData] = useState([]);

  const { user, token } = isAuthenticated();

  //useEffect---------------
  useEffect(() => {
    getAllPosts();
      // getMyFollowingPosts();
  }, []);

  //Get All Post Function---------------
  const getAllPosts = () => {
    //API call---------------
    getAllPost(user._id, token)
      .then((result) => {
        setData(result.data.posts);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  };

  //Get only MY Following one's posts---------------
  const getMyFollowingPosts = () => {
    //API call---------------
    getMyFollowingPost(user._id, token)
      .then((result) => {
        setData(result.data.myposts);
        setLoading(false)
      })
      .catch((err) => console.log(err));
  };

  //Search User Function---------------
  const searchUser = (username) => {
    //API call---------------
    searchForUser(user._id, token, username)
      .then((result) => {
        if (result.data.length === 0) {
          document.querySelector(
            ".home_page .right_box .input_box"
          ).style.borderBottom = "none";
          document.querySelector(
            ".home_page #customScrollBar"
          ).style.margin = "0px";
        } else {
          document.querySelector(
            ".home_page #customScrollBar"
          ).style.margin = "10px 1px";
          document.querySelector(
            ".home_page .right_box .input_box"
          ).style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
        }
        setsearchUserData(result.data);
      })
      .catch((err) => console.log(err));
  };

  return (
      <Container className="themed-container home_page" fluid>
      <Menu />
      {loading ? 
      (<div className="load">
        <img src={dostiKatta} alt="loading..." />
      </div>) : (
      <Row style={{ margin: "0" }}>
        <Col className="left_box" md="3">
          <ProfileCard />
        </Col>
        <Col className="middle_box" md="6">
          <div className="search_box" id="mob_search_box">
            <div className="input_box">
              <input
                className="search_user_input"
                type="text"
                placeholder="Enter Friend's Username"
                onChange={(e) => {
                  searchUser(e.target.value);
                }}
              />
            </div>
            <div className="searched_box scrollbar" id="customScrollBar">    
              {searchUserData.map((userData, index) => {
                return (
                  <Link
                    style={{ color: "#707070", textDecoration: "none" }}
                    to={
                      userData._id === user._id
                        ? "/profile"
                        : `/otherProfile/${userData._id}`
                    }
                  >
                    <div className="searched_user" key={index}>
                      <ProfilePhoto
                        isPhoto={userData.profile_photo ? true : false}
                        photoId={userData._id}
                        css={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "80px",
                        }}
                      />
                      <span>{userData.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          {data && data.length >= 1 ? <h4 className="no_of_post">Showing {data ? data.length : 0} post</h4> : null}
          {data.length > 0 ?
            data.map((post, index) => {
              return (
                <div className="post" key={index}>
                  <Post post={post} />
                </div>
              );
            }) : (
              <div className="no_posts">
                <img src={dostiKatta} alt="logo" width="230px" height="250px" />
                <h1>Welcome to Dosti Katta</h1>
                <h3>Time to Show Off</h3>
                <h3>Search and Follow users to see their posts  </h3>
              </div>
            )}
        </Col>
        <Col className="right_box" md="3">
          <div className="search_box">
            <div className="input_box">
              <input
                className="search_user_input"
                type="text"
                placeholder="Enter Friend's Username"
                onChange={(e) => {
                  searchUser(e.target.value);
                }}
              />
            </div>
            {searchUserData.map((userData, index) => {
              return (
                <div className="searched_user" key={index}>
                  <Link
                    style={{ color: "#707070", textDecoration: "none" }}
                    to={
                      userData._id === user._id
                        ? "/profile"
                        : `/otherProfile/${userData._id}`
                    }
                  >
                    <ProfilePhoto
                      isPhoto={userData.profile_photo ? true : false}
                      photoId={userData._id}
                      css={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "80px",
                      }}
                    />
                    <span>{userData.name}</span>
                    {/* <span>{userData.username}</span> */}
                  </Link>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      )
      }
      </Container>
    // <>
    //   <div className="container-fluid" style={{ margin: "0", padding: "0" }}>
    //     <Menu />
    //     <div
    //       className="row"
    //       style={{
    //         // backgroundColor: "#dfebee",
    //         minHeight: "100vh",
    //         margin: "0",
    //       }}
    //     >
    //       <div className="col-md-3" style={{ padding: "20px" }}>
    //         <ProfileCard />
    //         <div
    //           style={{
    //             background: "#D90429",
    //             borderRadius: "50px",
    //             boxShadow: "10px 10px 10px rgba(0,0,0,0.2)",
    //           }}
    //         >
    //           <Link to="/post/create" style={{ textDecoration: "none" }}>
    //             <p
    //               style={{
    //                 padding: "5px",
    //                 color: "white",
    //                 textAlign: "center",
    //               }}
    //             >
    //               Create a New POST
    //             </p>
    //           </Link>
    //         </div>
    //       </div>
    //       <div className="col-md-6" style={{ padding: "10px" }}>
    //         <p
    //           style={{
    //             color: "rgba(0,0,0,0.5)",
    //             fontWeight: "500",
    //             marginBottom: "0",
    //           }}
    //         >
    //           Showing {data ? data.length : 0} post
    //         </p>
    //         {data ? (
    //           data.map((post, index) => {
    //             return (
    //               <div key={index}>
    //                 <Post post={post} />
    //                 {/* -------------------------------------------------------------------------------------------- */}

    //                 {/* <div
    //                   style={{
    //                     marginTop: "10px",
    //                     display: "flex",
    //                     justifyContent: "left",
    //                     // position: "relative",
    //                   }}
    //                   className="row"
    //                 > */}
    //                 {/* <div
    //                     className="col-md-6 col-sm-12"
    //                     style={{ display: "flex", justifyContent: "left" }}
    //                   > */}
    //                 {/* {post.likes.includes(user._id) ? (
    //                       <>
    //                         <i
    //                           style={{
    //                             borderRadius: "50%",
    //                             backgroundColor: "white",
    //                             padding: "5px",
    //                             cursor: "pointer",
    //                             color: "#2162a3",
    //                             fontSize: "1.3em",
    //                             margin: "0",
    //                           }}
    //                           className="fa fa-thumbs-up"
    //                           aria-hidden="true"
    //                           onClick={() => {
    //                             UnlikePost(post._id);
    //                           }}
    //                         ></i>
    //                         <h6
    //                           style={{
    //                             marginTop: "10px",
    //                             marginBottom: "0",
    //                             marginLeft: "5px",
    //                             fontSize: ".7em",
    //                             fontWeight: "500",
    //                             color: "rgba(0,0,0,0.9)",
    //                           }}
    //                         >
    //                           Liked
    //                         </h6>
    //                       </>
    //                     ) : (
    //                       <i
    //                         style={{
    //                           borderRadius: "50%",
    //                           backgroundColor: "white",
    //                           padding: "5px",
    //                           cursor: "pointer",
    //                           color: "black",
    //                           fontSize: "1.2em",
    //                           margin: "0",
    //                         }}
    //                         className="fa fa-thumbs-up"
    //                         aria-hidden="true"
    //                         onClick={() => {
    //                           likePost(post._id);
    //                         }}
    //                       ></i>
    //                     )} */}
    //                 {/* </div> */}
    //                 {/* <div
    //                     className="col-md-6 col-sm-12"
    //                     style={{ margin: "0 auto", paddingTop: "0" }}
    //                   >
    //                     <form
    //                       onSubmit={(e) => {
    //                         e.preventDefault();
    //                         if (e.target[0].value === "") {
    //                           // return setError("Please Enter a Comment");
    //                           return alert("Comment cannot be empty");
    //                         }
    //                         commentOnPost(e.target[0].value, post._id);
    //                         // setError(false);
    //                         e.target[0].value = "";
    //                       }}
    //                     >
    //                       <input
    //                         type="text"
    //                         placeholder="Add a Comment"
    //                         style={{
    //                           marginTop: "0",
    //                           height: "30px",
    //                           backgroundColor: "white",
    //                           padding: "10px",
    //                           borderRadius: "50px",
    //                           border: "1px solid black",
    //                         }}
    //                       />
    //                     </form>
    //                   </div> */}
    //                 {/* </div> */}
    //                 {/* {post.comments.length <= 1 &&
    //                   post.comments.map((comm, index) => {
    //                     return (
    //                       <h6 key={index}>
    //                         <span style={{ fontWeight: "bold" }}>
    //                           {comm.postedBy}{" "}
    //                         </span>
    //                         {comm.text}
    //                       </h6>
    //                     );
    //                   })}
    //                 {post.comments.length >= 2 && (
    //                   <a
    //                     onClick={() => {
    //                       setReadMore(!readMore);
    //                       setReadMorePostId(post._id);
    //                     }}
    //                   >
    //                     <h6>{commentlinkName}</h6>
    //                   </a>
    //                 )}

    //                 {readMore &&
    //                   readMorePostId === post._id &&
    //                   post.comments.map((comm, index) => {
    //                     if (post.comments.length === 1) {
    //                       return;
    //                     }
    //                     return (
    //                       <h6 key={index}>
    //                         <span style={{ fontWeight: "bold" }}>
    //                           {comm.postedBy}{" "}
    //                         </span>
    //                         {comm.text}
    //                       </h6>
    //                     );
    //                   })}*/}
    //                 {/* {post.comments.map((comm, index) => {
    //                   return (
    //                     <h6 key={index}>
    //                       <span style={{ fontWeight: "bold" }}>
    //                         {comm.postedBy}{" "}
    //                       </span>
    //                       {comm.text}
    //                     </h6>
    //                   );
    //                 })} */}
    //                 {/* {errorMessage()} */}

    //                 {/* //----------YOUR COMMENTS
    //                 {post.comments.map((comm, index) => {
    //                   if (comm.postedBy === user.name) {
    //                     return (
    //                       <h6 key={index}>
    //                         <span style={{ fontWeight: "bold" }}>
    //                           {comm.postedBy}{" "}
    //                         </span>
    //                         {comm.text}
    //                       </h6>
    //                     );
    //                   }
    //                 })} */}

    //                 {/* -------------------------------------------------------------------------------------------- */}
    //               </div>
    //             );
    //           })
    //         ) : (
    //           <div>Welcome to DostiKatta</div>
    //         )}
    //       </div>
    //       <div className="col-md-3" style={{ padding: "10px" }}>
    //         <div>
    //           <input
    //             style={{
    //               padding: "2px",
    //               margin: "2px 0",
    //               borderRadius: "12px",
    //               outline: 0,
    //             }}
    //             type="text"
    //             placeholder="Search Username"
    //             onChange={(e) => {
    //               searchUser(e.target.value);
    //             }}
    //           />

    //           {searchUserData.map((userData, index) => {
    //             return (
    //               <div style={{ margin: "5px 5px " }}>
    //                 <Link
    //                   style={{ color: "#707070", textDecoration: "none" }}
    //                   to={
    //                     userData._id === user._id
    //                       ? "/profile"
    //                       : `/otherProfile/${userData._id}`
    //                   }
    //                 >
    //                   <ProfilePhoto
    //                     isPhoto={userData.profile_photo ? true : false}
    //                     photoId={userData._id}
    //                     css={{
    //                       width: "40px",
    //                       height: "40px",
    //                       borderRadius: "80px",
    //                     }}
    //                   />
    //                   <span
    //                     key={index}
    //                     style={{
    //                       padding: "2px",
    //                       margin: "2px 0",
    //                     }}
    //                   >
    //                     {userData.name}
    //                   </span>
    //                 </Link>
    //               </div>
    //             );
    //           })}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default Home;