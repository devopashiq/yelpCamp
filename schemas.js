const Joi = require('joi')

const CampgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        // image: Joi.string().uri().required(),

        location: Joi.string().required(),
        description: Joi.string().required()
    }).required(),deleteImages:Joi.array()

})

const ReviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(0).max(5)
    }).required()
})

module.exports = {
    CampgroundSchema,
    ReviewSchema
}
