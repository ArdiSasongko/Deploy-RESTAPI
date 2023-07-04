const sequelize = require("../database/connect")
const { DataTypes } = require("sequelize")

const Admins = sequelize.define("admins",{
    id_admin:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username:{
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password: {
        type : DataTypes.STRING,
        allowNull : false
    }
},{
    timestamps : false
})

module.exports = Admins