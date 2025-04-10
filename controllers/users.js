const User = require('../models/user');

module.exports.renderRegister=(req, res) => {
    res.render('users/register')
}
module.exports.register=async (req, res) => {
    try {
        const { username, email, password } = req.body.user
        const user = new User({ username, email })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Yelp Camp!')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

module.exports.renderLogin=(req, res) => {
    res.render('users/login')
}

module.exports.login=(req, res) => {
    req.flash('success', 'welcome back')
    const redirectUrl = res.locals.returnTo || '/campgrounds'

    res.redirect(redirectUrl)
}

module.exports.logout=(req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err) // Handle error properly
        }
        req.flash('success', 'Goodbye!')
        res.redirect('/campgrounds')
    })
}