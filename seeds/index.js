const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

const mongoURI = 'mongodb://127.0.0.1:27017/yelp-camp'

mongoose
    .connect(mongoURI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch(err => console.error('Error connecting to MongoDB:', err))

const randomSample = array => array[Math.floor(Math.random() * array.length)]

const seedDb = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '679b2969a74ccd73ccaaa18c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${randomSample(descriptors)} ${randomSample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dc0mq3cko/image/upload/v1738737306/yelpcamp/nrxyjb0wz3ike9ote4fz.jpg',
                  filename: 'yelpcamp/nrxyjb0wz3ike9ote4fz',
                 
                },
                {
                  url: 'https://res.cloudinary.com/dc0mq3cko/image/upload/v1738737306/yelpcamp/nwentmfurouetftdyaz1.jpg',
                  filename: 'yelpcamp/nwentmfurouetftdyaz1',
                  
                }
              ],
            description:
                ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate iure corrupti quas, deserunt labore, animi blanditiis modi tenetur dolor necessitatibus, magnam veritatis iusto distinctio vitae debitis aperiam perferendis dolorem laudantium!',
            price
        })
        await camp.save()
    }
}

seedDb().then(() => {
    mongoose.connection.close()
})
