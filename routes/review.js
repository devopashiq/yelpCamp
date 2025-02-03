const express = require('express')
const validateForm = require('../middleware/valdiateForm')
const router = express.Router({ mergeParams: true })
const wrapAsync = require('../utils/asyncHanlder')
const Campground = require('../models/campground')
const Review = require('../models/review')
const { ReviewSchema } = require('../schemas')
const { isLoggedIn } = require('../middleware/isLoggedIn')
const isAuthor = require('../middleware/isAuthor')
const reviews = require('../controllers/reviews')

router.post(
    '/',isLoggedIn,
    validateForm(ReviewSchema),
    wrapAsync(reviews.createReview)
) 

router.delete(
    '/:reviewId',isLoggedIn,isAuthor(Review),
    wrapAsync(reviews.deleteReview)
)

module.exports = router
