const express = require("express");
const parametroServices = require("../services/parametro")
const ParametroApi = (app) => {
    const router = express.Router();
    app.use("/parametro", router)
    //http://localhost:4000/parametro/4
    router.get("/:idparametro", async function (req, res, next) {
        const { idParametro } = req.params;
        try {
            const parametro = await parametroServices.getOne(idParametro);
            res.status(200).json({
                parametro,
                msg: parametro ?
                    'parametro encontrado' :
                    'no se encontro parametro'
            });
        } catch (error) {
            next(error);
        }
    });

    router.get("/", async function (req, res, next) {
        try {
            const parametro = await parametroServices.getAll();
            res.status(200).json({
                parametro,
                msg: parametro.length > 0 ?
                    'parametros encontrado' :
                    'no se encontro ningun parametro'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/createParametro", async function (req, res, next) {
        const { body: data } = req;
        try {
            const parametro = await parametroServices.createParametro(data);
            res.status(200).json({
                parametro,
                msg: parametro ?
                    'parametro encontrado' :
                    'no se encontro parametro'
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/update/:idparametro", async function (req, res, next) {
        const { body: data } = req;
        const { idparametro } = req.params;
        try {
            const parametro = await parametroServices.update(data, idparametro);
            res.status(200).json({
                parametro,
                msg: parametro ?
                    'parametro encontrado' :
                    'no se encontro parametro'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/deleteParametro", async function (req, res, next) {
        const { body: data } = req;
        try {
            const parametro = await parametroServices.deleteParametro(data);
            res.status(200).json({
                parametro,
                msg: parametro ?
                    'parametro encontrado' :
                    'no se encontro parametro'
            });
        } catch (error) {
            next(error);
        }
    });
}
module.exports = ParametroApi;