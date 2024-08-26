const express = require('express');
const router = express.Router();

//const Review = require("../models/review.js")
//const path = require("path");
const {index,newForm, createCamp,showPage,editPage,updatePage,deletePage} = require("../controllers/campground");

//const flash = require('connect-flash');
const{isLoggedIn} = require('../middleware');
const catchAsync = require('../utills/catchAsync.js');
const Campground = require("../models/campground")
const multer = require("multer");
const {storage} = require('../cloudinary/index.js');
const upload =multer({ storage: storage });
// multer({Storage});
const cloudinary = require('cloudinary').v2;

const ExpressError = require("../utills/ExpressError.js");

//const campground = require("../models/campground");
//var{campgroundSchema} = require("../schema.js");




const {validateCampground}= require("../middleware.js");
const {isAuthor} = require("../middleware.js");


router.get("/",  catchAsync(index));

router.get("/new",isLoggedIn,newForm);

router.post("/" ,isLoggedIn , upload.array('image'),validateCampground, catchAsync( createCamp))



router.get('/:id',catchAsync (showPage));


router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync (editPage));

router.put("/:id", isLoggedIn,isAuthor,upload.array('image') ,validateCampground , catchAsync (updatePage))

router.delete("/:id", isLoggedIn,isAuthor,catchAsync( deletePage))

module.exports = router;
