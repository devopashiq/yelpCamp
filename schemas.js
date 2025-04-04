const BaseJoi = require('joi');
const sanitize = require('sanitize-html');

const extension=(joi)=>({
    type:"string",
    base:joi.string(),
    messages:{
         'string.escapeHTML':' {{#label}} must not include HTML'
    },
    rules:{
        esacapeHTML:{
            validate(value,helpers){
                const clean= sanitize(value,{
                    allowedTags:[],
                    allowedAttributes:{},
                });

                if(clean !== value) return helpers.error('string.escapeHTML',{value})
                    return clean;
                

            }
        }
    }
})


const Joi= BaseJoi.extend(extension);

const CampgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().esacapeHTML(),
        price: Joi.number().required().min(0),
        

        location: Joi.string().required().esacapeHTML(),
        description: Joi.string().required().esacapeHTML(),
    }).required(),deleteImages:Joi.array()

})

const ReviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required().esacapeHTML(),
        rating: Joi.number().required().min(0).max(5)
    }).required()
})

module.exports = {
    CampgroundSchema,
    ReviewSchema
}
