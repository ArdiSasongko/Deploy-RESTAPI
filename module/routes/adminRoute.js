const express = require("express")
const routes = express.Router()
const admin = require("../controller/adminController")

routes.post("/", admin.RegAdmin)
routes.post("/login", admin.loginadmin)

module.exports = routes