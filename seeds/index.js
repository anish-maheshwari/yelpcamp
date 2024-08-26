const mongoose = require("mongoose");
const Campground = require("../models/campground")
const cities = require('./cities.js');
const { descriptors, places } = require("./seedHelper");


mongoose.connect('mongodb://localhost:27017/yelp-calm')
.then(()=>console.log("database is connected"))
.catch((data)=>{
    console.log("ohh no error is detected");
    console.log(data);
})

const sample = array => array[Math.floor(Math.random()*array.length)];
const newy = async ()=>{
await Campground.deleteMany()
.then((msg)=>console.log(msg));

for(let i=0;i<=50;i++){
    const rand1000 = Math.floor(Math.random()*1000);
const loco = new Campground({
    location:`${cities[rand1000].city},${cities[rand1000].state}` ,
    name: `${sample(descriptors)} ${sample(places)}`,
   
    author:'66bea79a8c46c7148fac53c6',
    description : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, saepe modi consequatur aliquam, cupiditate provident, possimus aperiam veniam iure mollitia dolorum similique eaque adipisci? Qui expedita velit sequi debitis asperiores.`,
    price : Math.floor(Math.random()*20)+10,
    images:     [ {url: 'https://res.cloudinary.com/dtis5uhdf/image/upload/v1723967700/YelpCamp/vkl3svmtwjeagfx7l9jn.jpg',
    filename: 'YelpCamp/dnlkfh1nsmtqz3fqyckc'}]



    

  
})
loco.save();

}
}
newy();