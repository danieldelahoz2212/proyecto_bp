const {
    Episodios: EpisodiosModel,
    sequelize
} = require('../models');

const getOne = async (id) => {
    const Episodios = await EpisodiosModel.findOne(id)
    return Episodios;
}

const getAll = async () => {
    const Episodios = await EpisodiosModel.findAll({
        where: { estado: 1 },
    })
    return Episodios;
}

const createEpisodio = async (data) => {
    const t = await sequelize.transaction();
    try {
        const episodio = await EpisodiosModel.create(data, { transaction: t })
        await t.commit();
        return episodio;
    } catch (e) {
        await t.rollback();
        console.log(e)
        return {
            status: 400,
            message: "Couldn't create",
        };
    }
}

const update = async (data, idEpisodio) => {
    const t = await sequelize.transaction();
    try {
        await EpisodiosModel.update(data, {
            where: { id: idEpisodio },
            transaction: t,
        })
        await t.commit();
        const updateEpisodio = await EpisodiosModel.findByPk(idEpisodio);
        return updateEpisodio
    } catch (e) {
        await t.rollback();
        console.log(e)
        return {
            status: 400,
            message: "Couldn't update",
        }
    }
}

const deleteEpisodio = async (idepisodio) => {
    const t = await sequelize.transaction();
    const episodio = await EpisodiosModel.getOne(idepisodio)
    if (!episodio) {
        return {
            status: 400,
            message: "User Not Found",
        };
    }
    try {
        await EpisodiosModel.update(
            { state: -1 },
            {
                where: { id: idepisodio },
                transaction: t,
            }
        )
        await t.commit();
        return idepisodio
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
    createEpisodio,
    update,
    deleteEpisodio
}