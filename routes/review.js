const express = require('express');
const router = express.Router({mergeParams:true});

//const flash = require('connect-flash');

//const app = express();
//const path = require("path");
//const mongoose = require("mongoose");
const catchAsync = require('../utills/catchAsync.js');
const Campground = require("../models/campground")
const Review = require("../models/review.js")
//const methodOverride = require("method-override");
const ExpressError = require("../utills/ExpressError.js");
//const campground = require("../models/campground");
const{reviewSchema} = require("../schema.js");
const{ValidateReview,isLoggedIn,isReviewAuthor}= require("../middleware");

const{newReview, deleteReview}=require("../controllers/reviews");





router.post("/",isLoggedIn ,ValidateReview ,catchAsync(newReview));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,catchAsync(deleteReview) );

module.exports = router;