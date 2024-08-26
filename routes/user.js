const express = require("express");
const router = express.Router();
const passport = require('passport');
const{isLoggedIn} = require('../middleware');
const session = require('express-session');

const User = require('../models/user.js');
const catchAsync = require("../utills/catchAsync.js");
const{signPage,logInPage,signedUp,loggedIn,logOut}= require("../controllers/users.js");

router.route("/register")
 .get(signPage)
 .post(catchAsync(signedUp))


 router.route("/login")
   .get(logInPage)
  .post(passport.authenticate('local',{failureFlash:true,failureRedirect:"/login"}) ,loggedIn)

router.get('/logout', logOut);

module.exports = router;
