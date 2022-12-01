module.exports =  (sequelize, DataTypes) => {
    const ValorP=  sequelize.define(
        "ValorP",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },
            id_parametro: { 
                type: DataTypes.BIGINT, 
                allowNull: false 
            },
            valor_parametro: { 
                type: DataTypes.STRING(500), 
                allowNull: false 
            },
            estado: {
                type: DataTypes.TINYINT(4),
                defaultValue: 1,
            },
        },
        {
            tableName: "ValorP",
            timestamps: false,
        }
    );

    ValorP.associate = function (models) {
        ValorP.belongsTo(models.Parametro, {
            foreignKey: "id_parametro",
            as: "Parametro",
        });
    };

    return ValorP;
};
