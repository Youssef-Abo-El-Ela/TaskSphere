const joi = require('joi')

const validateCreateUser = (req, res, next) => {
    const userCreateSchema = joi.object({
        name: joi.string().min(3).max(30).required(),
    })

    const { error } = userCreateSchema.validate(req.body)
    if (error) {
        next(new Error(`Validation error: ${error.details[0].message}`))
    }
    next()
}

const validateUpdateUser = (req, res, next) => {
    const userUpdateSchema = joi.object({
        name: joi.string().min(3).max(30),
        isActive: joi.boolean()
    })


    const { error } = userUpdateSchema.validate(req.body)
    if (error) {
        next(new Error(`Validation error: ${error.details[0].message}`))
    }
    next()
}

module.exports = {
    validateCreateUser,
    validateUpdateUser
}