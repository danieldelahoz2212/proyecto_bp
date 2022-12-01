module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
        "Usuario",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
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
            email: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            estado: {
                type: DataTypes.TINYINT(4),
                defaultValue: 1,
            },
        },
        {
            tableName: "Usuario_fan",
            timestamps: false,
        }
    );

    Usuario.associate = function (models) {
        Usuario.hasMany(models.Person, {
            foreignKey: "id_usuario",
            as: "Person",
        });
    };

    return Usuario;
};