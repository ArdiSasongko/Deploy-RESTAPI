const joi = require("joi")

const LoginAdmin = joi.object({
    username : joi.string().required(),
    password : joi.string().min(8).required()
})

module.exports = LoginAdmin