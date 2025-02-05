const mongoose = require('mongoose')
const Review = require('./review')
const opts = { toJSON: { virtuals: true } };

const Schema = mongoose.Schema

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200')
})
const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    images: [ImageSchema],
    location: String,
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
},opts)

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc.reviews && doc.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: doc.reviews } })
    }
})


CampgroundSchema.virtual("properties.popupMarkUp").get(function(){
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a><h3>${this.description.substring(0,20)}</h3></strong>`
})


const Campground = mongoose.model('Campground', CampgroundSchema)

module.exports = Campground
