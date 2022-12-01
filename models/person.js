module.exports =  (sequelize, DataTypes) => {
    const Person= sequelize.define(
        "Person",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            id_personajeApi: { 
                type: DataTypes.BIGINT, 
                allowNull: false 
            },
            nombre: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            apellido: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            edad: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            genero: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            id_usuario: { 
                type: DataTypes.BIGINT, 
                allowNull: false 
            },
            estado: {
                type: DataTypes.TINYINT(4),
                defaultValue: 1,
            },
        },
        {
            tableName: "Person",
            timestamps: false,
        }
    );

    Person.associate = function (models) {
        Person.belongsTo(models.Usuario, {
            foreignKey: "id_usuario",
            as: "Usuario",
        });

        Person.hasMany(models.Episodios, {
            foreignKey: "id_personaje",
            as: "Episodios",
        });
    };

    return Person;
};