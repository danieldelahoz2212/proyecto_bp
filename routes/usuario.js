const express = require("express");
const usuarioServices = require("../services/usuario")
const UserApi = (app) => {
    const router = express.Router();
    app.use("/usuario", router)
    //http://localhost:4000/usuario/1
    router.get("/:idUsuario", async function (req, res, next) {
        const { idUsuario } = req.params;
        try {
            const user = await usuarioServices.getOne(idUsuario);
            res.status(200).json({
                user,
                msg: user ?
                    'usuario encontrado' :
                    'no se encontro usuario'
            });
        } catch (error) {
            next(error);
        }
    });

    router.get("/", async function (req, res, next) {
        try {
            const user = await usuarioServices.getAll();
            res.status(200).json({
                user,
                msg: user.length > 0 ?
                    'usuarios encontrados' :
                    'no se encontro ningun usuario'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/createUsuario", async function (req, res, next) {
        const { body: data } = req;
        try {
            const user = await usuarioServices.createUsuario(data);
            res.status(200).json({
                user,
                msg: user ?
                    'usuarios encontrados' :
                    'no se encontro ningun usuario'
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/update/:idUsuario", async function (req, res, next) {
        const { body: data } = req;
        const { idUsuario } = req.params;
        try {
            const user = await usuarioServices.update(data, idUsuario);
            res.status(200).json({
                user,
                msg: user ?
                    'usuarios encontrados' :
                    'no se encontro ningun usuario'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/deleteUser", async function (req, res, next) {
        const { body: data } = req;
        try {
            const user = await usuarioServices.deleteUser(data);
            res.status(200).json({
                user,
                msg: user ?
                    'usuarios encontrados' :
                    'no se encontro ningun usuario'
            });
        } catch (error) {
            next(error);
        }
    });
}

//consulta un usuario x
//consulta todos los usuarios x
//crea un usuario x
//actualiza un usuario x
//elimina un usuario x
module.exports = UserApi;