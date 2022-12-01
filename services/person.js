const {
    Person: personModel,
    sequelize
} = require('../models');

const getOne = async (id) => {
    const Personaje = await personModel.findOne(id)
    return Personaje;
}

const getAll = async () => {
    const Personaje = await personModel.findAll({
        where: { estado: 1 },
    })
    return Personaje;
}

const createPersonaje = async (data) => {
    const t = await sequelize.transaction();
    try {
        const person = await personModel.create(data, { transaction: t })
        await t.commit();
        return person;
    } catch (e) {
        await t.rollback();
        console.log(e)
        return {
            status: 400,
            message: "Couldn't create",
        };
    }
}

const update = async (data, idPersonaje) => {
    const t = await sequelize.transaction();
    try {
        await personModel.update(data, {
            where: { id: idPersonaje },
            transaction: t,
        })
        await t.commit();
        const updatePerson = await personModel.findByPk(idPersonaje);
        return updatePerson
    } catch (e) {
        await t.rollback();
        console.log(e)
        return {
            status: 400,
            message: "Couldn't update",
        }
    }
}

const deletePerson = async (idPerson) => {
    const t = await sequelize.transaction();
    const Person = await personModel.getOne(idPerson)
    if (!Person) {
        return {
            status: 400,
            message: "User Not Found",
        };
    }
    try {
        await personModel.update(
            { state: -1 },
            {
                where: { id: idPerson },
                transaction: t,
            }
        )
        await t.commit();
        return idPerson
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
    createPersonaje,
    update,
    deletePerson
}