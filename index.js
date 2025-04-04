if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}


const express = require('express')
const app = express()
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressErrorHandler')
const passport = require('passport')
const localStrategy = require('passport-local')

const campgroundroute = require('./routes/campground')
const reviewroute = require('./routes/review')
const usersroute = require('./routes/users')

const session = require('express-session')
const flash = require('express-flash')

const User = require('./models/user');
const { name } = require('ejs');

//session
const sessionConfig = {
    name:"session",
    secret: 'dsdehdbjdsfs',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure:true,
        express: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())
//_method override
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//ejs path
app.set('view engine', 'ejs')
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, './public/')))
app.use(mongoSanitize());

//mongo connection 
const mongoURI = 'mongodb://127.0.0.1:27017/yelp-camp'
mongoose
    .connect(mongoURI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch(err => console.error('Error connecting to MongoDB:', err))

app.listen(3000, () => {
    console.log('server is runnig on port 3000')
})

//passport

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Middleware to make flash messages available in templates

app.use((req, res, next) => {
   
    res.locals.currentUser = req.user
    res.locals.success_msg = req.flash('success')
    res.locals.error_msg = req.flash('error')
    next()
})

//home route
app.get('/', (req, res) => {
    res.render('home')
})

//Campground Route
app.use('/campgrounds', campgroundroute)

//Review Routes
app.use('/campgrounds/:id/reviews', reviewroute)

//User Routes
app.use('/', usersroute)

//Global error
app.all('*', (req, res) => {
    throw new ExpressError('page not found', 404)
})

//Error middleware
app.use((err, req, res, next) => {
    if (!err.message) {
        err.message = 'Something went wrong'
    }
    const { status = 500 } = err
    res.status(status).render('error', { err })
})
