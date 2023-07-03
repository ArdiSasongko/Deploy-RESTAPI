const express = require("express")
const routes = new express.Router()
const book = require("../controller/bookController")

routes.post("/", book.AddBook)
routes.get("/", book.GetBooks)
routes.get("/:id", book.GetBook)
routes.put("/:id", book.UpdateBook)
routes.delete("/:id", book.DeleteBook)

module.exports = routes