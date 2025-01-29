const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");



const mongoURI = "mongodb://127.0.0.1:27017/yelp-camp";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));


  const randomSample = (array)=> array[Math.floor(Math.random() * array.length)];

const seedDb = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({

            location:`${randomSample(cities).city}, ${randomSample(cities).state}`,
            title:`${randomSample(descriptors)} ${randomSample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description:" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate iure corrupti quas, deserunt labore, animi blanditiis modi tenetur dolor necessitatibus, magnam veritatis iusto distinctio vitae debitis aperiam perferendis dolorem laudantium!",
            price
        });
        await camp.save();
    }
    
}


seedDb().then(()=>{
    mongoose.connection.close
});
  
