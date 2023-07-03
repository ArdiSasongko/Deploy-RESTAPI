const Book = require("../model/bookModel")
const Response = require("../model/Response")
const HttpStatus = require("http-status")
const bookValidator = require("../utils/bookValidator")

const AddBook = async (req,res) =>{
    try {
        const dataBook = await bookValidator.validateAsync(req.body)
        const result = await Book.create(dataBook)

        if(!result){
            const response = new Response.Error(true, "Failed adding book")
            return res.status(HttpStatus.BAD_REQUEST).json(response)
        }

        const response = new Response.Success(false, "Success adding book", result)
        return res.status(HttpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(HttpStatus.OK).json(response)
    }
}

const GetBooks = async (req,res) => {
    try {
        const findBooks = await Book.findAll();

        if(!findBooks){
            const response = new Response.Error(true, "Data not found")
            return res.status(HttpStatus.NOT_FOUND).json(response)
        }
        const dataBook = findBooks.map((Book)=>{
            const { id_book, title, price } = Book
            return { id_book, title, price }
        })
        const response = new Response.Success(false, "Data Find", dataBook)
        return res.status(HttpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(HttpStatus.NOT_FOUND).json(response)
    }
}

const GetBook = async (req, res) =>{
    try {
        const { id } = req.params
        const findBook = await Book.findOne({where : {id_book : id}})

        if(!findBook){
            const response = new Response.Error(true, "Data not found")
            return res.status(HttpStatus.NOT_FOUND).json(response)
        }
        const response = new Response.Success(false, "Data Find", findBook)
        return res.status(HttpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(HttpStatus.NOT_FOUND).json(response)
    }
}

const UpdateBook = async (req,res) =>{
    try {
        const { id } = req.params
        const { title, description, price } = req.body

        const [dataUpdate] = await Book.update(
            {title, description, price},
            {where:{id_book : id}}
        )

        if(!dataUpdate || dataUpdate === 0){
            const response = new Response.Error(true, "Failed update book")
            return res.status(HttpStatus.BAD_REQUEST).json(response)
        }

        const data = await Book.findOne({where :{id_book:id}})
        const response = new Response.Success(false, "Success update book", data)
        return res.status(HttpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(HttpStatus.NOT_FOUND).json(response)
    }
}

const DeleteBook = async (req,res) =>{
    try {
        const { id } = req.params
        const data = await Book.destroy({where :{id_book: id}})
        if(!dataBook || dataBook === 0){
            const response = new Response.Error(true, "Failed to Delete data");
            return res.status(httpStatus.BAD_REQUEST).json(response);
        }

        const response = new Response.Success(false, "Successfully delete data");
        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        const response = new Response.Error(true, error.message);
        return res.status(httpStatus.BAD_REQUEST).json(response);
    }
}

module.exports = {GetBooks, GetBook, AddBook, UpdateBook, DeleteBook}