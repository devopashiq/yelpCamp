const express = require("express");
const validateForm = require("../utils/valdiateForm");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/asyncHanlder");
const Campground = require("../models/campground");
const Review = require("../models/review");
const {ReviewSchema } = require('../schemas');



router.post(
    "/",validateForm(ReviewSchema),
    wrapAsync(async (req, res) => {
      const { review } = req.body;
     
      const { id } = req.params;
      
      const campground = await Campground.findById(id);
      const newReview = new Review(review);
        
      await newReview.save();
      campground.reviews.push(newReview);
      await campground.save();
      req.flash("success","Created a new review")
      res.redirect(`/campgrounds/${id}`);
    })
  );
  
  router.delete("/:reviewId", wrapAsync(async (req,res)=>{
    const{id,reviewId} = req.params;
    console.log(req.params)
    const review = await Review.findByIdAndDelete(reviewId);

      console.log(review)
    const campground = await Campground.findByIdAndUpdate(id ,{$pull:{reviews:reviewId}});
  
    campground.save();
    
    req.flash("success","Deleted a  review")
    res.redirect(`/campgrounds/${id}`);
   
  }))

  module.exports = router;