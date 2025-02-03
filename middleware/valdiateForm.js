const ExpressError = require('../utils/ExpressErrorHandler')

const validateForm = Schema => (req, res, next) => {
    const { error } = Schema.validate(req.body)
  
    if (error) {
        const msg = error.details.map(el => el.message).join(',')

        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports = validateForm
