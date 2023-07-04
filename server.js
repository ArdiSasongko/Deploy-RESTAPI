const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3500

const app = express()

dotenv.config()
require("./module/database/connect")

//routes
const Book = require("./module/routes/bookRoute")
const Admin = require("./module/routes/adminRoute")


app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req,res)=>{
    console.log("Response Success")
    res.status(200).send("Success Response")
})

//route
app.use("/Book", Book)
app.use("/Admin", Admin)

app.use("*", (req,res)=>{
    res.status(404).send("Page not found")
})

app.listen(PORT, ()=>{
    console.log(`Running in http://localhost:${PORT}`)
})