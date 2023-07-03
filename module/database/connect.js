const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("book_store", "root", "1234", {
    host: "34.101.201.109",
    dialect: "mysql"
})

module.exports = sequelize