import React, { useEffect, useState } from "react";
import "./style/profileCard.css";
//Packages-----------------
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
//Function importing-----------------
import { isAuthenticated } from "../auth/helper";
import { getProfileOfUser } from "./helper/UserHelper";
//Components-----------------
import ProfilePhoto from "../components/ProfilePhoto";

const ProfileCard = () => {
  //useState---------------
  const [profile, setProfile] = useState();
  const [posts, setPosts] = useState([]);
  const [gotData, setGotData] = useState();
  const [followingShow, setFollowingShow] = useState(false);
  const [followersShow, setFollowersShow] = useState(false);

  const { user, token } = isAuthenticated();

  //useEffect---------------
  useEffect(() => {
    getProfile();
  }, []);
  
  //Get Profile of the User Function---------------
  const getProfile = () => {
    //API call---------------
    getProfileOfUser(user._id, user._id, token)
      .then((result) => {
        if (result.error) {
          return setGotData(false);
        }
        setProfile(result.data.user);
        setPosts(result.data.posts);
        setGotData(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="profile_card_box">
      {gotData && (
        <>
        <Modal
        show={followingShow}
        onHide={() => setFollowingShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={true}
        style={{
          background: "rgb(0, 0, 0, 0.6)",
          fontFamily: "'Truculenta', sans-serif"
        }}
      >
        <Modal.Header closeButton style={{background: "#86b7fe"}}>
          <Modal.Title id="example-custom-modal-styling-title">
            Following
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background: "#ffe7c3"}}>
          {profile.following.map((f, i) => {
            return (
              <div className="searched_user" key={i}>
            <Link
              style={{ color: "#707070", textDecoration: "none" }}
              to={
                f._id === user._id
                  ? "/profile"
                  : `/otherProfile/${f._id}`
              }
            >
              <ProfilePhoto
                isPhoto={f.profile_photo ? true : false}
                photoId={f._id}
                css={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "80px",
                }}
              />
              <span>{f.username}</span>
            </Link>
          </div>
            );
          })}
        </Modal.Body>
      </Modal>
      <Modal
        show={followersShow}
        onHide={() => setFollowersShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={true}
        style={{
          background: "rgb(0, 0, 0, 0.6)",
          fontFamily: "'Truculenta', sans-serif"
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Followers
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {profile.followers.map((f, i) => {
            return (
              <div className="searched_user" key={i}>
            <Link
              style={{ color: "#707070", textDecoration: "none" }}
              to={
                f._id === user._id
                  ? "/profile"
                  : `/otherProfile/${f._id}`
              }
            >
              <ProfilePhoto
                isPhoto={f.profile_photo ? true : false}
                photoId={f._id}
                css={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "80px",
                }}
              />
              <span>{f.username}</span>
            </Link>
          </div>
            );
          })}
        </Modal.Body>
      </Modal>
          <div className="profile_card_div">
            <Row className="top_profile_card_box">
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ProfilePhoto
                  isPhoto={profile.profile_photo ? true : false}
                  photoId={profile._id}
                  css={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "80px",
                    marginBottom: "5px",
                  }}
                />
                <h1>{profile.name}</h1>
                <h2>@{profile.username}</h2>
              </Link>
            </Row>
            <Row className="bottom_profile_card_box">
              <Col className="followers" sm="4" onClick={() => setFollowersShow(true)}>
                <p>{profile.followers.length}</p>
                <span>Followers</span>
              </Col>
              <Col className="following" sm="4" onClick={() => setFollowingShow(true)}>
                <p>{profile.following.length}</p>
                <span>Following</span>
              </Col>
              <Col className="posts" sm="4">
                <p>{posts.length}</p>
                <span>Posts</span>
              </Col>
            </Row>
          </div>
          <div className="create_post_button">
            <Link to="/post/create" style={{ textDecoration: "none" }}>
              <Button className="new_post">Create a New POST</Button>
            </Link>
          </div>
        </>
      )}
    </Container>
    // <div
    //   style={{
    //     borderRadius: "12px",
    //     backgroundColor: "white",
    //     margin: "30px 0",
    //     padding: "20px 30px 20px 30px",
    //   }}
    // >
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //     }}
    //   >
    //     <ProfilePhoto
    //       isPhoto={user.profile_photo.contentType ? true : false}
    //       photoId={user._id}
    //       css={{
    //         width: "130px",
    //         height: "130px",
    //         borderRadius: "80px",
    //         marginBottom: "5px",
    //       }}
    //     />
    //     {/* <img
    //       style={{
    //         width: "130px",
    //         height: "130px",
    //         borderRadius: "80px",
    //       }}
    //       src="data:image/jpeg;base64,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"
    //       alt="Dp"
    //     /> */}
    //     <h4 style={{ marginTop: "10px" }}>{user.name}</h4>
    //     <i
    //       className="fa fa-angle-down dropbtn"
    //       onClick={onDropdown}
    //       aria-hidden="true"
    //       style={{
    //         fontSize: "2em",
    //         padding: "5px",
    //         color: "#fa002f",
    //       }}
    //     ></i>
    //     {isDropdown ? (
    //       <div
    //         style={{
    //           borderRadius: "12px",
    //           backgroundColor: "#e9e9e9",
    //           padding: "10px 10px",
    //           marginBottom: "10px",
    //           width: "100%",
    //         }}
    //       >
    //         <div
    //           style={{
    //             marginBottom: "10px",
    //             width: "100%",
    //           }}
    //         >
    //           <Link
    //             to="/profile"
    //             style={{ textDecoration: "none", color: "black" }}
    //           >
    //             View Profile
    //           </Link>
    //         </div>
    //       </div>
    //     ) : null}

    //     <div
    //       style={{
    //         borderRadius: "12px",
    //         backgroundColor: "#e9e9e9",
    //         padding: "15px 10px",
    //         width: "100%",
    //       }}
    //     >
    //       <div
    //         style={{
    //           borderRadius: "12px",
    //           backgroundColor: "white",
    //           padding: "5px 10px",
    //           // marginBottom: "10px",
    //           width: "100%",
    //         }}
    //       >
    //         <Link
    //           to="/post/create"
    //           style={{ color: "#dc9202", textDecoration: "none" }}
    //         >
    //           Create Post
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProfileCard;