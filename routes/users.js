const express = require('express')
const User = require('../models/user')
const wrapAsync = require('../utils/asyncHanlder')
const passport = require('passport')
const { storeReturnTo } = require('../middleware/isLoggedIn')
const router = express.Router()
const users = require('../controllers/users')

router.route('/register').get(users.renderRegister).post(wrapAsync(users.register))

router
    .route('/login')
    .get(users.renderLogin)
    .post(
        storeReturnTo,
        passport.authenticate('local', {
            failureFlash: true,
            failureRedirect: '/login'
        }),
        users.login
    )

router.get('/logout', users.logout)

module.exports = router
