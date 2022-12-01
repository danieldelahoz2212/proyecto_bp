const Sequelize = require("sequelize");
const { db_database } = require("../config/");
const config = require("../config/")

const sequelize = new Sequelize(
    config.db_database,
    config.db_user,
    config.db_password,
    {
        host: config.db_host,
        dialect: config.db_dialect,
        port: config.db_port,
        logging: false
    }
);

const Usuario = require("./usuario")(sequelize, Sequelize.DataTypes)
const Person = require("./person")(sequelize, Sequelize.DataTypes)
const Episodios = require("./episodios")(sequelize, Sequelize.DataTypes)
const Parametro = require("./parametro")(sequelize, Sequelize.DataTypes)
const valorparametro = require("./valorparametro")(sequelize, Sequelize.DataTypes)

const db = { 
    Usuario,
    Person,
    Episodios,
    Parametro,
    valorparametro
}

db.Usuario.associate(db);
db.Person.associate(db);
db.Episodios.associate(db);
db.valorparametro.associate(db);
db.Parametro.associate(db);


db.sequelize=sequelize; 
db.Sequelize=Sequelize; 

sequelize.sync();


module.exports = db;