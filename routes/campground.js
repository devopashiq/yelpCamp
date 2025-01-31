const express = require("express");
const { CampgroundSchema } = require("../schemas");
const validateForm = require("../middleware/valdiateForm");
const router = express.Router();
const wrapAsync = require("../utils/asyncHanlder");
const Campground = require("../models/campground");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const isAuthor = require("../middleware/isAuthor");

router.get("", async (req, res) => {
  console.log(req.user);
  const camps = await Campground.find({});

  res.render("campgrounds/index", { camps });
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});
router.post(
  "/",
  isLoggedIn,
  validateForm(CampgroundSchema),
  wrapAsync(async (req, res, next) => {
    const { campground } = req.body;

    const newCamp = new Campground(campground);
    newCamp.author = req.user._id;
    await newCamp.save();

    req.flash("success", "created new campground");
    res.redirect(`/campgrounds/${newCamp._id}`);
  })
);

router.get(
  "/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id)
      .populate("reviews")
      .populate("author")
      .exec();
    console.log(camp);
    if (!camp) {
      req.flash("error", "Cannot find that campground!");
      return res.redirect("/campgrounds");
    }

    res.render("campgrounds/show", { camp });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);

    if (!camp) {
      req.flash("error", "Cannot find that campground!");
      return res.redirect("/campgrounds");
    }

    res.render("campgrounds/edit", { camp });
  })
);

router.put(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  validateForm(CampgroundSchema),
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const updateCamp = await Campground.findByIdAndUpdate(
      id,
      req.body.campground,
      { runValidators: true, new: true }
    );
    req.flash("success", "Edited the campground");
    res.redirect(`/campgrounds/${updateCamp._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  isAuthor,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Campground.findByIdAndDelete(id);
    req.flash("success", "Deleted a campground");
    res.redirect("/campgrounds");
  })
);

module.exports = router;
