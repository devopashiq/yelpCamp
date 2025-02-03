const isAuthor = model => async (req, res, next) => {
    const { id, reviewId } = req.params
    let result;
    if (model.modelName === 'Campground') {
        result = await model.findById(id)
    } else if (model.modelName === 'Review') {
        result = await model.findById(reviewId)
    }
   

    if (!result) {
        req.flash('error', 'Resource not found!')
        return res.redirect('/campgrounds') // Redirect to campgrounds if nothing is found
    }

    if (!result.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/campgrounds/${id}`) // Redirect back to campground
    }

    next() // Proceed to the next middleware or route handler
}

module.exports = isAuthor
