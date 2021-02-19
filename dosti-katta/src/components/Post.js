import React, { useEffect, useState } from "react";
import { API } from "../backend";
import "./style/post.css";
//Packages-----------------
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
//Function importing-----------------
import { isAuthenticated } from "../auth/helper";
import { likeAPost, unLikeAPost } from "../core/helper/PostHelper";
//Images-----------------
import PostImage from "./PostImage";
import ProfilePhoto from "./ProfilePhoto";
import likeButtonPic from "../likeButtonPic.png";
import likedButtonPic from "../likedButtonPic.png";
import commentPic from "../commentPic.png";

const Post = ({ post }) => {
  //useState---------------
  const [data, setData] = useState([]);
  const [disableLike, setDisableLike] = useState(false);
  const [disableUnLike, setDisableUnLike] = useState(false);

  const { user, token } = isAuthenticated();
  const [likedPost, setLikedPost] = useState(post.likes.includes(user._id));

  let Idate = new Date(post.createdAt);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  //useEffect---------------
  useEffect(() => {}, [data]);

  //Like a Post---------------
  const likePost = (postId) => {
    setDisableLike(true);
    //API call---------------
    likeAPost(user._id, token, postId)
      .then((result) => {
        setDisableUnLike(false);
        const newData = data.map((item) => {
          if (item._id === result.data._id) {
            return result.data;
          } else {
            return item;
          }
        });
        setData(newData);
        setLikedPost(true);
        // window.localStorage.setItem(post._id, true);
      })
      .catch((err) => console.log(err));
  };

  //Unlike a Post---------------
  const unlikePost = (postId) => {
    setDisableUnLike(true);
    //API call---------------
    unLikeAPost(user._id, token, postId)
      .then((result) => {
        setDisableLike(false);
        const newData = data.map((item) => {
          if (item._id === result.data._id) {
            return result.data;
          } else {
            return item;
          }
        });
        setData(newData);
        setLikedPost(false);
        // window.localStorage.setItem(post._id, false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="post_box">
      <Row className="top_post_box">
        <Col className="left_post_box" xs="3">
          <Row className="postedBy_box">
            <Link
              to={
                user._id === post.postedBy._id
                  ? "/profile"
                  : `/otherProfile/${post.postedBy._id}`
              }
              style={{ textDecoration: "none" }}
            >
              <ProfilePhoto
                isPhoto={post.postedBy.profile_photo ? true : false}
                photoId={post.postedBy._id}
                css={{
                  width: window.innerWidth > 360 ? "80px" : "60px",
                  height: window.innerWidth > 360 ? "80px" : "60px",
                  borderRadius: "200px",
                }}
              />
              <h1>{post.postedBy.name}</h1>
              <h6>@{post.postedBy.username}</h6>
            </Link>
          </Row>
        </Col>
        <Col className="right_post_box" xs="9">
          <Row>
            <h2 className="post_title">{post.title}</h2>
          </Row>
          <Row>
            <h4 className="post_body">{post.body}</h4>
          </Row>
          <a href={`${API}/post/photo/${user._id}/${post._id}`}>
            <Row className="post_photo">
              {post.photo && <PostImage post={post} />}
            </Row>
          </a>
        </Col>
      </Row>
      <Row className="bottom_post_box">
        <Col className="reaction_post" xs="2">
          {likedPost ? (
            <div
              style={{opacity: disableUnLike ? 0.3 : 1}}
              onClick={() => {
                !disableUnLike && unlikePost(post._id);
              }}
            >
              <img src={likedButtonPic} alt="Liked Button" />
              <span style={{ color: "#24a0ed", fontWeight: "bold" }}>
                {/* {post.likes.length}  */}
                Liked
              </span>
            </div>
          ) : (
            <div
              style={{opacity: disableLike ? 0.3 : 1}}
              onClick={() => {
                !disableLike && likePost(post._id);
              }}
            >
              <img
                className="like_button"
                alt="Like Button"
                src={likeButtonPic}
              />
              <span>
                {/* {post.likes.length} */}
                Like
              </span>
            </div>
          )}
        </Col>
        <Col className="comments_post" xs="3">
          <Link
            to={`/post/view/${post._id}`}
            style={{ textDecoration: "none" }}
          >
            <img src={commentPic} alt="Show Comments" />
            <span> Comments</span>
          </Link>
        </Col>
        {/* <Col className="postedOn_post" xs="2"></Col> */}
        <Col className="postedOn_post" xs="7">
          <h4>Posted on:</h4>
          <h4>
            {/* ${Idate.getHours()}:${Idate.getMinutes()} */}
            {`${Idate.getDate()} ${
              monthNames[Idate.getMonth()]
            } ${Idate.getFullYear()}`}
          </h4>
        </Col>
      </Row>
    </Container>
    // <div>
    //   <Link
    //     to={
    //       user._id === post.postedBy._id
    //         ? "/profile"
    //         : `/otherProfile/${post.postedBy._id}`
    //     }
    //     style={{ textDecoration: "none", color: "darkblue" }}
    //   >
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "left",
    //         position: "relative",
    //       }}
    //     >
    //       <ProfilePhoto
    //         isPhoto={post.postedBy.profile_photo ? true : false}
    //         photoId={post.postedBy._id}
    //         css={{
    //           width: "50px",
    //           height: "50px",
    //           borderRadius: "200px",
    //           marginRight: "10px",
    //           float: "left",
    //         }}
    //       />
    //       {/* <img
    //       src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=="
    //       width="50px"
    //       height="50px"
    //       style={{
    //         borderRadius: "200px",
    //         marginRight: "10px",
    //         float: "left",
    //       }}
    //     /> */}
    //       <div>
    //         <h4
    //           style={{
    //             color: "darkblue",
    //             fontSize: "1.6em",
    //             fontWeight: "400",
    //             marginTop: "5px",
    //             marginBottom: "0",
    //           }}
    //         >
    //           {post.postedBy.name}
    //         </h4>

    //         <h4
    //           style={{
    //             color: "rgba(0,0,0,0.6)",
    //             fontSize: ".8em",
    //             margin: "0",
    //           }}
    //         >
    //           {`${Idate.getHours()}:${Idate.getMinutes()}`},{" "}
    //           {`${Idate.getDate()}/${
    //             Idate.getMonth() + 1
    //           }/${Idate.getFullYear()}`}
    //         </h4>
    //       </div>
    //     </div>
    //   </Link>
    //   <div style={{ marginTop: "10px" }}>
    //     {post.photo && <PostImage post={post} />}
    //     <h3
    //       style={{
    //         marginTop: "5px",
    //         fontSize: "1em",
    //         fontWeight: "700",
    //         color: "rgba(0,0,0,0.7)",
    //       }}
    //     >
    //       {post.title}
    //     </h3>

    //     <h5
    //       style={{
    //         marginTop: "5px",
    //         fontSize: "1em",
    //         fontWeight: "500",
    //         color: "rgba(0,0,0,0.7)",
    //       }}
    //     >
    //       {post.body}
    //     </h5>
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "left",
    //         marginTop: "20px",
    //         marginBottom: "0",
    //       }}
    //     >
    //       <h6
    //         style={{
    //           marginBottom: "0",
    //           marginRight: "10px",
    //           fontSize: ".7em",
    //           fontWeight: "500",
    //           color: "rgba(0,0,0,0.9)",
    //         }}
    //       >
    //         {post.likes.length} Likes
    //       </h6>
    //       <h6
    //         style={{
    //           marginBottom: "0",
    //           fontSize: ".7em",
    //           fontWeight: "500",
    //           color: "rgba(0,0,0,0.9)",
    //         }}
    //       >
    //         {post.comments.length} Comments
    //       </h6>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Post;