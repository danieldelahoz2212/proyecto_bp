const dotenv = require("dotenv")

dotenv.config()

const configuration = {
    port: process.env.PORT,
    db_host: process.env.DB_HOST,
    db_password: process.env.DB_PASSWORD,
    db_database: process.env.DB_DATABASE,
    db_user: process.env.DB_USER,
    db_port:process.env.DB_PORT,
    db_dialect: process.env.DB_DIALECT
}

module.exports = configuration;