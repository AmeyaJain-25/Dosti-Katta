import React, { useEffect, useState } from "react";
import "./style/menu.css";
//Packages-----------------
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa"
//Function importing-----------------
import { isAuthenticated, signout } from "../auth/helper";
import { getProfileOfUser } from "./helper/UserHelper";
//Componenets-----------------
import ProfilePhoto from "../components/ProfilePhoto";

const Menu = ({ history }) => {
  //useState---------------
  const [profile, setProfile] = useState([]);
  const [gotData, setGotData] = useState(false);
  
  const { user, token } = isAuthenticated();

  //Toggle classmane active Function---------------
  const toggleMenu = () => {
    document.querySelector(".menu").classList.toggle("active");
  };

  //useEffect---------------
  useEffect(() => {
    getProfile();
  }, []);

  //Gte Profile of a User Function---------------
  const getProfile = () => {
    //API call---------------
    getProfileOfUser(user._id, user._id, token)
      .then((result) => {
        if (result.error) {
          return setGotData(false);
        }
        setProfile(result.data.user);
        // setmyPost(result.posts);
        setGotData(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="menu_container" fluid>
      <Row style={{margin: "0px"}}>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <h1 className="logoname_navbar">Dosti Katta</h1>
        </Link>
        
        <div className="logout_box">
          <Button
            onClick={() => {
              signout(() => {
                return history.push("/");
              });
            }}
            className="logout"
          >
            Log Out
          </Button>
          <Link to="/info" className="info_circle"><FaInfoCircle style={{fontSize: "1.5em", margin: "0 10px"}} title="About Us"/></Link>
          <div className="profile_photo_mob" onClick={() => toggleMenu()}>
            {gotData && (
              <ProfilePhoto
                className="profile_photo"
                isPhoto={profile.profile_photo ? true : false}
                photoId={profile._id}
                css={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "200px",
                }}
              />
            )}
          </div>
          <div className="menu">
            <h3>{gotData && profile.name}</h3>
            <h4>@{gotData && profile.username}</h4>
            <ul>
              <li>
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/post/create"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Create Post
                </Link>
              </li>
              <li
                onClick={() => {
                  signout(() => {
                    return history.push("/");
                  });
                }}
              >
                Log Out
              </li>
              <li>
                <Link to="/info" style={{textDecoration: "none", color: "black"}}>
                  <FaInfoCircle style={{fontSize: "1.5em", margin: "0 5px"}} title="About Us"/>About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Row>
    </Container>
    // <div>
    //   <Link to="/home" style={{ textDecoration: "none" }}>
    //     <h1
    //       style={{
    //         fontWeight: "bold",
    //         color: "black",
    //         margin: "10px 0",
    //         textAlign: "center",
    //       }}
    //     >
    //       Taste
    //       <span style={{ color: "#0f52ba" }}>Book</span>
    //     </h1>
    //   </Link>
    //   <div>
    //     <input
    //       style={{
    //         padding: "2px",
    //         margin: "2px 0",
    //         borderRadius: "12px",
    //         outline: 0,
    //       }}
    //       type="text"
    //       placeholder="Search Username"
    //       onChange={(e) => {
    //         searchUser(e.target.value);
    //       }}
    //     />
    //     <div
    //       style={{ overflowY: "scroll", maxWidth: "300px", maxHeight: "70px" }}
    //     >
    //       {searchUserData.map((userData, index) => {
    //         return (
    //           <>
    //             <ProfilePhoto
    //               isPhoto={userData.profile_photo ? true : false}
    //               photoId={userData._id}
    //               css={{
    //                 width: "40px",
    //                 height: "40px",
    //                 borderRadius: "80px",
    //               }}
    //             />
    //             <p
    //               key={index}
    //               style={{
    //                 padding: "2px",
    //                 margin: "2px 0",
    //                 borderRadius: "12px",
    //                 background: "slategray",
    //               }}
    //             >
    //               <Link
    //                 style={{ color: "red" }}
    //                 to={
    //                   userData._id === user._id
    //                     ? "/profile"
    //                     : `/otherProfile/${userData._id}`
    //                 }
    //               >
    //                 {userData.name}
    //               </Link>
    //             </p>
    //           </>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>
  );
};

export default withRouter(Menu);