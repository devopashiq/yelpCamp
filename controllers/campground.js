const cloudinary = require('cloudinary').v2

const Campground = require('../models/campground')

module.exports.index = async (req, res) => {
    const camps = await Campground.find({})
    res.render('campgrounds/index', { camps })
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
}

module.exports.createCampground = async (req, res, next) => {
    const { campground } = req.body

    const newCamp = new Campground(campground)
    newCamp.images = await req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }))

    console.log(req.files)
    newCamp.author = req.user._id
    console.log(newCamp)
    await newCamp.save()

    req.flash('success', 'created new campground')
    res.redirect(`/campgrounds/${newCamp._id}`)
}

module.exports.showCampground = async (req, res) => {
    const { id } = req.params
    const camp = await Campground.findById(id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author')
        .exec()
    if (!camp) {
        req.flash('error', 'Cannot find that campground!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { camp })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params
    const camp = await Campground.findById(id)

    if (!camp) {
        req.flash('error', 'Cannot find that campground!')
        return res.redirect('/campgrounds')
    }

    res.render('campgrounds/edit', { camp })
}

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params

    console.log(req.body)

    const updateInfo = req.body.campground

    if (req.body.deleteImages && req.body.deleteImages.length > 0) {
        await Campground.findByIdAndUpdate(id, {
            $pull: {
                images: {
                    filename: { $in: req.body.deleteImages }
                }
            }
        })

        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);

        }
    }

    const imgs = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }))

    if (imgs.length > 0) {
        updateInfo.$push = { images: { $each: imgs } }
    }

    const updateCamp = await Campground.findByIdAndUpdate(id, updateInfo, {
        runValidators: true,
        new: true
    })

    req.flash('success', 'Edited the campground')
    res.redirect(`/campgrounds/${updateCamp._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params

    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Deleted a campground')
    res.redirect('/campgrounds')
}
