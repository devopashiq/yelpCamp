const Campground = require("../models/campground");

const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    
    if (!camp || !camp.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }

    next(); // Proceed to the next middleware or route handler
};

module.exports = isAuthor;
