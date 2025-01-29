const express = require("express");
const app = express();
const path = require("path");

const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressErrorHandler");

const mongoose = require("mongoose");

const campgroundroute = require("./routes/campground");
const reviewroute = require("./routes/review");

//_method override
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//ejs path
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "./public/")));

// const validateForm =(Schema)=> (req, res, next) => {
//   const { error } = Schema.validate(req.body);

//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");

//     throw new ExpressError(msg, 400);
//   } else {
//     next();
//   }
// };

//mongo connection
const mongoURI = "mongodb://127.0.0.1:27017/yelp-camp";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(3000, () => {
  console.log("server is runnig on port 3000");
});

//home route

app.get("/", (req, res) => {
  res.render("home");
});

//campground route

app.use("/campgrounds", campgroundroute);

// app.get("/campgrounds", async (req, res) => {
//   const camps = await Campground.find({});

//   res.render("campgrounds/index", { camps });
// });

// app.get("/campgrounds/new", (req, res) => {
//   res.render("campgrounds/new");
// });
// app.post(
//   "/campgrounds",
//   validateForm(CampgroundSchema),
//   wrapAsync(async (req, res, next) => {
//     const { campground } = req.body;

//     const newCamp = new Campground(campground);
//     await newCamp.save();

//     res.redirect(`/campgrounds/${newCamp._id}`);
//   })
// );

// app.get(
//   "/campgrounds/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const camp = await Campground.findById(id).populate("reviews").exec();

//     console.log(camp.reviews);

//     res.render("campgrounds/show", { camp });
//   })
// );

// app.get(
//   "/campgrounds/:id/edit",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const camp = await Campground.findById(id);
//     res.render("campgrounds/edit", { camp });
//   })
// );

// app.put(
//   "/campgrounds/:id/edit",
//   validateForm(CampgroundSchema),
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     const updateCamp = await Campground.findByIdAndUpdate(
//       id,
//       req.body.campground,
//       { runValidators: true, new: true }
//     );

//     res.redirect(`/campgrounds/${updateCamp._id}`);
//   })
// );

// app.delete(
//   "/campgrounds/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     await Campground.findByIdAndDelete(id);

//     res.redirect("/campgrounds");
//   })
// );

// review route
app.use("/campgrounds/:id/reviews", reviewroute);

// app.post(
//   "/campgrounds/:id/reviews",validateForm(ReviewSchema),
//   wrapAsync(async (req, res) => {
//     const { review } = req.body;

//     const { id } = req.params;
//     const campground = await Campground.findById(id);
//     const newReview = new Review(review);

//     await newReview.save();
//     campground.reviews.push(newReview);
//     await campground.save();
//     res.redirect(`/campgrounds/${id}`);
//   })
// );

// app.delete("/campgrounds/:id/reviews/:reviewId", wrapAsync(async (req,res)=>{
//   const{id,reviewId} = req.params;
//   const review = await Review.findByIdAndDelete(reviewId);
//   review.save();

//   const campground = await Campground.findByIdAndUpdate(id ,{$pull:{reviews:reviewId}});

//   campground.save();

//   res.redirect(`/campgrounds/${id}`);

// }))

app.all("*", (req, res) => {
  throw new ExpressError("page not found", 404);
});

app.use((err, req, res, next) => {
  if (!err.message) {
    err.message = "Something went wrong";
  }
  const { status = 500 } = err;
  res.status(status).render("error", { err });
});
