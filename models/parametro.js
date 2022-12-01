module.exports = (sequelize, DataTypes) => {
    const Parametro = sequelize.define(
        "Parametro",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            nombre_parametro: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            estado: {
                type: DataTypes.TINYINT(4),
                defaultValue: 1,
            },
        },
        {
            tableName: "Parametro",
            timestamps: false,
        }
    );

    Parametro.associate = function (models) {
        Parametro.hasMany(models.valorparametro, {
            foreignKey: "id_parametro",
            as: "ValorP",
        });
    };

    return Parametro;
};
