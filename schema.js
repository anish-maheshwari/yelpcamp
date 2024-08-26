const Joi = require("joi");




module.exports.campgroundSchema = Joi.object({
        campground : Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required().min(0),
            description: Joi.string().required(),
            //image: Joi.string().required(),
            location: Joi.string().required(),
    
    
    
        }).required(),
        deleteImages:Joi.array()

    })

    module.exports.reviewSchema = Joi.object({
        review : Joi.object({
            body: Joi.string().required(),
            rating: Joi.number().required()
        }).required(),
    })