if(process.env.NODE_ENV!=="production"){
    require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const campgroundRoute = require("./routes/campground.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const mongoSanitize = require("express-mongo-sanitize");

const app = express();
const path = require("path");
const session = require('express-session');
const  MongoStore = require("connect-mongo");

const flash = require('connect-flash');
const mongoose = require("mongoose");
const catchAsync = require('./utills/catchAsync.js');
const Campground = require("./models/campground")
const Review = require("./models/review.js")

const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require("./utills/ExpressError.js");
const Joi = require('joi');
//const campground = require("./models/campground");
const{campgroundSchema,reviewSchema} = require("./schema.js");

const passport = require("passport");
const localStrategy = require("passport-local");
const User = require('./models/user.js');
const mongoUrl = process.env.MONGO_URL;
//const mongoUrl = 'mongodb://localhost:27017/yelp-calm';



//mongoose.connect('mongodb://localhost:27017/yelp-calm')
mongoose.connect(mongoUrl)
.then(()=>console.log("database is connected"))
.catch((data)=>{
    console.log("ohh no error is detected");
    console.log(data);
})




app.engine('ejs',ejsMate);

app.set('view engine','ejs');
app.set("views", path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));

const store = MongoStore.create({
    mongoUrl:mongoUrl,
    touchAfter:24*60*60,
    crypto:{
        secret:"thisshouldbeabettersecret!"
    }
});
store.on("error",function(e){
    console.log("SESSION STORE ERROR",e);
})
app.use(session({
    name:"session",
    store:store,
    secret:'flashblog',
    saveUninitialized: true,
    resave: false
}));

app.use(flash());
app.use(mongoSanitize());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req,res,next)=>{

    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    next();
})

app.use('/campgrounds', campgroundRoute);
app.use('/campgrounds/:id/reviews',reviewRoute);
app.use("/",userRoute);
app.use(express.static(path.join(__dirname,'public')));

app.get("/",(req,res)=>{
    res.render('home');
});



app.all("*",(req,res,next)=>{
    next(new ExpressError('page not found',404))
})

app.use((err,req,res,next)=>{
    const {statusCode = 500} = err;
    if(!err.message) {
        err.message = "Something went wrong error not found";
    }
    


    res.status(statusCode).render('./campgrounds/error.ejs',{err});
})




app.listen('3000',  (req,res)=> console.log("connection open at port 3000"))
