const express = require("express");
const personServices = require("../services/person")
const PersonApi = (app) => {
    const router = express.Router();
    app.use("/person", router)
    //http://localhost:4000/P/2
    router.get("/:idPerson", async function (req, res, next) {
        const { idPerson } = req.params;
        try {
            const person = await personServices.getAll(idPerson);
            res.status(200).json({
                person,
                msg: person ?
                    'personage encontrado' :
                    'no se encontro personage'
            });
        } catch (error) {
            next(error);
        }
    });

    router.get("/", async function (req, res, next) {
        try {
            const person = await personServices.getAll();
            res.status(200).json({
                person,
                msg: person.length > 0 ?
                    'personajes encontrados' :
                    'no se encontro ningun personaje'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/createPersonaje", async function (req, res, next) {
        const { body: data } = req;
        try {
            const person = await personServices.createPersonaje(data);
            res.status(200).json({
                person,
                msg: person ?
                    'personaje encontrado' :
                    'no se encontro personaje'
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/update/:idPerson", async function (req, res, next) {
        const { body: data } = req;
        const { idPerson } = req.params;
        try {
            const person = await personServices.update(data, idPerson);
            res.status(200).json({
                person,
                msg: person ?
                    'personaje encontrado' :
                    'no se encontro personaje'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/deletePerson", async function (req, res, next) {
        const { body: data } = req;
        try {
            const person = await personServices.deletePerson(data);
            res.status(200).json({
                person,
                msg: person ?
                    'personaje encontrado' :
                    'no se encontro personaje'
            });
        } catch (error) {
            next(error);
        }
    });
}
module.exports = PersonApi;