const express = require("express");
const {CampgroundSchema} = require('../schemas');
const validateForm = require("../utils/valdiateForm");
const router = express.Router();
const wrapAsync = require("../utils/asyncHanlder");
const Campground = require("../models/campground");

router.get("", async (req, res) => {
  const camps = await Campground.find({});

  res.render("campgrounds/index", { camps });
}); 

router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});
router.post(
  "/",
  validateForm(CampgroundSchema),
  wrapAsync(async (req, res, next) => {
    const { campground } = req.body;

    const newCamp = new Campground(campground);
    await newCamp.save();

    req.flash("success","created new campground")
    res.redirect(`/campgrounds/${newCamp._id}`);
  })
);

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id).populate("reviews").exec();

   if(!camp){
    req.flash('error',"Cannot find that campground!");
    return res.redirect("/campgrounds")
   }

    res.render("campgrounds/show", { camp });
  })
);

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if(!camp){
      req.flash('error',"Cannot find that campground!");
      return res.redirect("/campgrounds")
     }
    res.render("campgrounds/edit", { camp });
  })
);

router.put(
  "/:id/edit",
  validateForm(CampgroundSchema),
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const updateCamp = await Campground.findByIdAndUpdate(
      id,
      req.body.campground,
      { runValidators: true, new: true }
    );
    req.flash("success","Edited the campground")
    res.redirect(`/campgrounds/${updateCamp._id}`);
  })
);

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Campground.findByIdAndDelete(id);
    req.flash("success","Deleted a campground")
    res.redirect("/campgrounds");
  })
);




module.exports = router;