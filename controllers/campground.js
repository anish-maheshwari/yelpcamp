const Campground = require("../models/campground")
const {cloudinary} = require("../cloudinary/index.js");

//const maplibregl = require("maplibre-gl");
//const { GeocodingControl } = require("@maptiler/geocoding-control/maplibregl");
const { link } = require("joi");
//const "@maptiler/geocoding-control/dist/style.css";
//const "maplibre-gl/dist/maplibre-gl.css";


const apiKey = process.env.MAPBOX_TOKEN;





module.exports.index = async(req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('./campgrounds/index.ejs', {campgrounds} );
}

module.exports.newForm = (req,res)=>{
    
    res.render('./campgrounds/new.ejs');
}

module.exports.createCamp = async(req,res,next)=>{
    

   const campground = new Campground(req.body.campground);
    campground.images = req.files.map(f=> ({
        url:f.path,
        filename:f.filename
    }))
    campground.author = req.user._id;

    await campground.save();
  req.flash("success","Successfully made a new");

    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showPage = async(req,res)=>{
    
    const campground = await Campground.findById(req.params.id).populate({
     path:"reviews",
     populate:{
         path:"author"
     }
    }).populate("author");
    if(!campground){
     req.flash("error","error occured campground not found");
 
 return res.redirect(`/campgrounds`);
 
 }
 
     res.render('./campgrounds/show.ejs',{ campground });
 }

 module.exports.editPage = async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
 
 
     res.render('./campgrounds/edit.ejs',{ campground });
 }
 module.exports.updatePage = async(req,res)=>{
    const {id}  = req.params;


   const camp = await Campground.findByIdAndUpdate(id,{...req.body.campground});
       const imgs = req.files.map(f=> ({
        url:f.path,
        filename:f.filename
    }))
    camp.images.push(...imgs);

    await camp.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
await cloudinary.uploader.destroy(filename);
        }
       await camp.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
    
    }

    req.flash("success","Successfully updated campground");
    res.redirect(`/campgrounds/${camp._id}`);
}
module.exports.deletePage = async(req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);

    res.redirect("/campgrounds");


}