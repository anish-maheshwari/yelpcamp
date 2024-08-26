const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const User = require("./user");

const ImageSchema = new Schema({
  url: String,
  filename: String
});
ImageSchema.virtual("thumbnail").get(function(){
 return this.url.replace("/upload","/upload/w_200");
});


const campgroundSchema = new Schema({
    name: String,
    price: Number,
    images : [ImageSchema],
    description: String,
    location: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref:'Review'
    }],
    author: {
      type: Schema.Types.ObjectId,
      ref:'User'
  }
});
campgroundSchema.post('findOneAndDelete',async function(doc){
  if(doc){
    await Review.deleteMany({
        _id:{
            $in:doc.reviews
        }
    })
  }
})

module.exports = mongoose.model('Campground',campgroundSchema);
