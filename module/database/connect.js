const {Sequelize} = require("sequelize")
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager")

const Client = new SecretManagerServiceClient()

const getSecretValue = async() =>{
    const [version] =await Client.accessSecretVersion({
        name: "projects/19458587232/secrets/pw_db/versions/1"
    })
    const data = version.payload.data.toString("utf8")
    return data
}

const pass = getSecretValue();

const sequelize = new Sequelize("book_store", pass, "1234", {
    host: "34.101.201.109",
    dialect: "mysql"
})

module.exports = sequelize