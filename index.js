const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErrorHandler");
const mongoose = require("mongoose");
const campgroundroute = require("./routes/campground");
const reviewroute = require("./routes/review");
const session = require('express-session');
const flash = require('connect-flash');
//session
 const sessionConfig={
  secret:"dsdehdbjdsfs",
  resave:false,
  saveUninitialized:true,
  cookie:{
    httpOnly:true,
    express:Date.now() + 1000*60*60*24*7,
    maxAge: 1000*60*60*24*7
  } 

 }

 app.use(session(sessionConfig));
 app.use(flash());
 

//_method override
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride("_method"));

//ejs path
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "./public/")));

//mongo connection
const mongoURI = "mongodb://127.0.0.1:27017/yelp-camp";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(3000, () => {
  console.log("server is runnig on port 3000");
});

// Middleware to make flash messages available in templates
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});


//home route
app.get("/", (req, res) => {
  res.render("home");
});

//campground route
app.use("/campgrounds", campgroundroute);
//Review routes
app.use("/campgrounds/:id/reviews", reviewroute);

//Global error
app.all("*", (req, res) => {
  throw new ExpressError("page not found", 404);
});

//Error middleware
app.use((err, req, res, next) => {
  if (!err.message) {
    err.message = "Something went wrong";
  }
  const { status = 500 } = err;
  res.status(status).render("error", { err });
});
