import React from "react";
import { API } from "../backend";
import "./style/postImage.css";
//Function importing-----------------
import { isAuthenticated } from "../auth/helper";
//Images-----------------
import expandPic from "../expandPic.png";

const PostImage = ({ post }) => {
  const { user } = isAuthenticated();

  const imageUrl = post
    ? `${API}/post/photo/${user._id}/${post._id}`
    : "https://www.flaticon.com/svg/static/icons/svg/2922/2922506.svg";

  return (
    <div
      className="post_image_div"
      style={{
        background: `url(${imageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* <a href={imageUrl}> */}
      <img src={expandPic} alt="expand icon" />
      {/* </a> */}
    </div>
  );
};

export default PostImage;