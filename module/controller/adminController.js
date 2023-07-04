const bcrypt = require("../utils/bcrypt")
const AdminValidator = require("../utils/adminValidator")
const Admin = require("../model/adminModel")
const LogAdmin = require("../utils/loginAdmin")
const Response = require("../model/Response")
const httpStatus = require("http-status")
const jwt = require("jsonwebtoken")
// const { SecretManagerServiceClient } = require("@google-cloud/secret-manager")

// const Client = new SecretManagerServiceClient()

// const getSecretValue = async() =>{
//     const [version] =await Client.accessSecretVersion({
//         name: "projects/19458587232/secrets/key/versions/1"
//     })
//     const data = version.payload.data.toString("utf8")
//     return data
// }

const RegAdmin = async (req, res) => {
    try {
        const admin = await AdminValidator.validateAsync(req.body)
        const userAdmin = await Admin.findOne({ where: { username: admin.username } })
        const emailAdmin = await Admin.findOne({ where: { email: admin.email } })

        if (userAdmin) {
            const response = new Response.Error(true, "Username already exists")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }
        if (emailAdmin) {
            const response = new Response.Error(true, "Email already exists")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const hash = await bcrypt.hash(admin.password)
        admin.password = hash

        const result = await Admin.create(admin)

        const response = new Response.Success(false, "Success Registering as Admin", result)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const loginadmin = async (req,res) =>{
    const key = process.env.KEY
    try {
        const request = await LogAdmin.validateAsync(req.body)
        const email = await Admin.findOne({where : {username:request.username}})

        if(!email){
            const response = new Response.Error(true, "Invalid Email")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const validPassword = await bcrypt.compare(
            request.password, email.password
        )

        if(!validPassword){
            const response = new Response.Error(true, "Invalid Password")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const createJWT = await jwt.sign({id : email.id_admin}, key)
        const data = { token : createJWT, username : email.username}
        const response = new Response.Success(false, `Success Login`, data)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

module.exports = {RegAdmin, loginadmin}
