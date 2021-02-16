const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getUserById,
  followUser,
  unFollowUser,
  searchUser,
  addProfilePhoto,
  getProfilePhoto,
  getOtherUserById,
  getOtherUser,
} = require("../controllers/user");

//-------------------------
//PARAMS
//-------------------------
router.param("otherUserId", getOtherUserById);
router.param("userId", getUserById);


//-------------------------
//ROUTES
//-------------------------

//Find/Search User----------------
router.post("/user/search/:userId", isSignedIn, isAuthenticated, searchUser);

//Add Profile Photo----------------
router.post(
  "/user/add/profile_photo/:userId",
  isSignedIn,
  isAuthenticated,
  addProfilePhoto
);

//Get Profile Photo----------------
router.get(
  "/user/profile_photo/:userId/:otherUserId",
  // isSignedIn,
  // isAuthenticated,
  getProfilePhoto
);

//Follow User----------------
router.put("/user/follow/:userId", isSignedIn, isAuthenticated, followUser);

//Unfollow User----------------
router.put("/user/unfollow/:userId", isSignedIn, isAuthenticated, unFollowUser);

//Get Another User----------------
router.get(
  "/otheruser/:userId/:otherUserId",
  isSignedIn,
  isAuthenticated,
  getOtherUser
);

module.exports = router;