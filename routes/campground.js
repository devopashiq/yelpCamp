const express = require('express')
const { CampgroundSchema } = require('../schemas')
const validateForm = require('../middleware/valdiateForm')
const router = express.Router()
const wrapAsync = require('../utils/asyncHanlder')
const Campground = require('../models/campground')
const { isLoggedIn } = require('../middleware/isLoggedIn')
const isAuthor = require('../middleware/isAuthor')
const campground = require('../controllers/campground') 
const multer  = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({storage});



router
    .route('/')
    .get(campground.index)
    .post(isLoggedIn,upload.array('image'),validateForm(CampgroundSchema), wrapAsync(campground.createCampground))
   
router.get('/new', isLoggedIn, campground.renderNewForm)

router
    .route('/:id')
    .get(wrapAsync(campground.showCampground))
    .delete(isLoggedIn, isAuthor(Campground), wrapAsync(campground.deleteCampground))
router.get('/:id/edit', isLoggedIn, isAuthor(Campground), wrapAsync(campground.renderEditForm))

router.put(
    '/:id/edit',
    isLoggedIn,
    isAuthor(Campground),
    upload.array('image'),
    validateForm(CampgroundSchema),
    wrapAsync(campground.updateCampground)
)

module.exports = router
