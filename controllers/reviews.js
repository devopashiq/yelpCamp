const Campground = require('../models/campground')
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const { review } = req.body

    const { id } = req.params

    const campground = await Campground.findById(id)
    const newReview = new Review(review)
    newReview.author = req.user._id
    await newReview.save()
    campground.reviews.push(newReview)
    await campground.save()
    req.flash('success', 'Created a new review')
    res.redirect(`/campgrounds/${id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params

    const review = await Review.findByIdAndDelete(reviewId)

    const campground = await Campground.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    })

    campground.save()

    req.flash('success', 'Deleted a  review')
    res.redirect(`/campgrounds/${id}`)
}
