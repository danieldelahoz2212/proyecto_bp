const dotenv = require("dotenv");

dotenv.config();

const configuration = {
    port: process.env.PORT
}

module.exports = configuration;