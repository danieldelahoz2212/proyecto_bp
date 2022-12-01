module.exports = (sequelize, DataTypes) => {
    const Episodios= sequelize.define(
        "Episodios",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            fecha: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            temporada: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            num_episodio: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            descripcion: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            id_personaje: { 
                type: DataTypes.BIGINT, 
                allowNull: false 
            },
            estado: {
                type: DataTypes.TINYINT(4),
                defaultValue: 1,
            },
        },
        {
            tableName: "Episodios",
            timestamps: false,
        }
    );

    Episodios.associate = function (models) {
        Episodios.belongsTo(models.Person, {
            foreignKey: "id_personaje",
            as: "Person",
        });
    };

    return Episodios;
};