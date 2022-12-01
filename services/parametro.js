const {
    Parametro: ParametroModel,
    valorparametro: ValorParametroModel,
    sequelize
} = require('../models');

const getOne = async (id) => {
    const parametro = await ParametroModel.findOne(id)
    return parametro;
}

const getAll = async () => {
    const parametro = await ParametroModel.findAll({
        where: { estado: 1 },
        include: [
            {
                model: ValorParametroModel,
                as: 'ValorP',
                where: { estado: 1 },
            }
        ]
    })
    return parametro;
}

const createParametro = async ({ nombre_parametro, listValor }) => {
    const t = await sequelize.transaction();
    try {
        const parametro = await ParametroModel.create({ nombre_parametro }, { transaction: t })
        if (listValor) {
            await Promise.all(listValor.map((item) => {
                const data = {
                    valor_parametro: item.valor_parametro,
                    id_parametro: parametro.id,
                    estado: '1'
                }
                return ValorParametroModel.create(data, { transaction: t });
            }
            ));
        }
        await t.commit();

        const newParametro = await ParametroModel.findOne({
            where: { estado: 1, id: parametro.id },
            include: [
                {
                    model: ValorParametroModel,
                    as: 'ValorP',
                    where: { estado: 1 },
                }
            ]
        });

        return newParametro;
    } catch (e) {
        await t.rollback();
        console.log(e)
        return {
            status: 400,
            message: "Couldn't create",
        };
    }
}

const update = async ({ nombre_parametro, listValor = [] }, idParametro) => {
    const t = await sequelize.transaction();
    try {
        if (nombre_parametro) {
            await ParametroModel.update({ nombre_parametro }, {
                where: { id: idParametro },
                transaction: t,
            })
        }

        if (listValor.length > 0) {
            const valoresPamtero = await ValorParametroModel.findAll({
                where: {
                    estado: 1,
                    id_parametro: idParametro
                }
            });

            const listIdParamtero = valoresPamtero.map(item => item.id);
            const valorerID = listValor.map(item => {
                if (item.id) {
                    return item.id
                }
            });

            const updateList = listValor.map(item => {
                if (item.id) {
                    return item
                }
            });

            const createList = listValor.map(item => {
                if (!item.id) {
                    return item
                }
            });
            const deleteList = listIdParamtero.filter(item => !valorerID.includes(item.id));

            await Promise.all(deleteList.map(async (id) => {
                await ValorParametroModel.update(
                    { estado: -1 },
                    {
                        where: { estado: 1, id },
                        transaction: t,
                    }

                )
            }));

            await Promise.all(updateList.map(async (data) => {
                await ValorParametroModel.update(
                    data,
                    {
                        where: { estado: 1, id: data.id },
                        transaction: t,
                    }

                )
            }));

            await Promise.all(createList.map(async (data) => {
                await ValorParametroModel.update(
                    {
                        estado: '1',
                        id_parametro: idParametro,
                        valor_parametro: data.valor_parametro
                    },
                    {
                        transaction: t,
                    }

                )
            }));

        } else {
            await ValorParametroModel.update(
                { state: -1 },
                {
                    where: { id_parametro: idParametro, },
                    transaction: t,
                }
            )
        }

        const updateParametro = await ParametroModel.findOne({
            where: { estado: 1, id: idParametro },
            include: [
                {
                    model: ValorParametroModel,
                    as: 'ValorP',
                    where: { estado: 1 },
                }
            ]
        });

        await t.commit();
        return updateParametro
    } catch (e) {
        await t.rollback();
        console.log(e)
        return {
            status: 400,
            message: "Couldn't update",
        }
    }
}

const deleteParametro = async (idParametro) => {
    const t = await sequelize.transaction();
    const episodio = await ParametroModel.getOne(idParametro)
    if (!episodio) {
        return {
            status: 400,
            message: "User Not Found",
        };
    }
    try {
        await ParametroModel.update(
            { state: -1 },
            {
                where: { id: idParametro },
                transaction: t,
            }
        )

        await ValorParametroModel.update(
            { state: -1 },
            {
                where: { id_parametro: idParametro },
                transaction: t,
            }
        )
        await t.commit();
        return idParametro;
    } catch (e) {
        await t.rollback()
        console.log(e)
        return {
            status: 400,
            message: "Couldn't delete",
        };
    }
}
module.exports = {
    getOne,
    getAll,
    createParametro,
    update,
    deleteParametro
}