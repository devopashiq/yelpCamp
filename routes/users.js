const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/asyncHanlder");
const passport = require("passport");
const { storeReturnTo } = require("../middleware/isLoggedIn");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  wrapAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body.user;
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser,err =>{
        if(err) return next(err);
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/campgrounds");
      })
     

    } catch (e) {
      req.flash("error", e.message);
      res.redirect("register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});
router.post(
  "/login",storeReturnTo,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {

    req.flash("success", "welcome back");
    const redirectUrl =   res.locals.returnTo || "/campgrounds";
    
    res.redirect(redirectUrl); 
  }
);

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err); // Handle error properly
      }
      req.flash("success", "Goodbye!");
      res.redirect('/campgrounds');
    });
  });
  
module.exports = router;
