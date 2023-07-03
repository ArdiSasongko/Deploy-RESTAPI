const sequelize = require("../database/connect")
const { DataTypes } = require("sequelize")

const Books = sequelize.define("books",{
    id_book : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type : DataTypes.STRING,
        allowNull : false
    },
    price : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
})

module.exports = Books