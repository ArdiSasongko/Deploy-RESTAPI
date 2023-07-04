const joi = require("joi")

const AdminValidator = joi.object({
    username: joi.string().required(),
    password: joi.string().min(8).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: joi.string().email().required(),
})

module.exports = AdminValidator
