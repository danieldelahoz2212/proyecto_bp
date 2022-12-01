const {
    Usuario: usuarioModel,
    sequelize
} = require('../models');

const getOne = async (id) => {
    const Usuario = await usuarioModel.findOne(id)
    return Usuario;
}

const createUsuario = async (data) => {
    const t = await sequelize.transaction();
    try {
        const Usuario = await usuarioModel.create(data, { transaction: t })
        await t.commit();
        return Usuario;
    } catch (e) {
        await t.rollback();
        console.log(e)
        return {
            status: 400,
            message: "Couldn't create",
        };
    }
}

const update = async (data, idUsuario) => {
    const t = await sequelize.transaction();
    try {
        await usuarioModel.update(data, {
            where: { id: idUsuario },
            transaction: t,
        })
        await t.commit();
        const updateUser = await usuarioModel.findByPk(idUsuario);
        return updateUser
    } catch (e) {
        await t.rollback();
        console.log(e)
        return {
            status: 400,
            message: "Couldn't update",
        }
    }
}

const getAll = async () => {
    const Usuario = await usuarioModel.findAll({
        where: { estado: 1 },
    })
    return Usuario;
}

const deleteUser = async (idUser) => {
    const t = await sequelize.transaction();
    const Usuario = await usuarioModel.getOne(idUser)
    if (!Usuario) {
        return {
            status: 400,
            message: "User Not Found",
        };
    }
    try {
        await usuarioModel.update(
            { state: -1 },
            {
                where: { id: idUser },
                transaction: t,
            }
        )
        await t.commit();
        return idUser
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
    createUsuario,
    update,
    deleteUser
}