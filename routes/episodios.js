const express = require("express");
const episodioServices = require("../services/episodios")
const EpisodiosApi = (app) => {
    const router = express.Router();
    app.use("/episodios", router)
    //http://localhost:4000/episodios/3
    router.get("/:idEpisodios", async function (req, res, next) {
        const { idEpisodios } = req.params;
        try {
            const episodios = await episodioServices.getOne(idEpisodios);
            res.status(200).json({
                episodios,
                msg: episodios ?
                    'episodio encontrado' :
                    'no se encontro episodio'
            });
        } catch (error) {
            next(error);
        }
    });

    router.get("/", async function (req, res, next) {
        try {
            const episodios = await episodioServices.getAll();
            res.status(200).json({
                episodios,
                msg: episodios.length > 0 ?
                    'episodio encontrado' :
                    'no se encontro episodio'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/createEpisodio", async function (req, res, next) {
        const { body: data } = req;
        try {
            const episodios = await episodioServices.createEpisodio(data);
            res.status(200).json({
                episodios,
                msg: episodios ?
                    'episodiosaje encontrado' :
                    'no se encontro episodiosaje'
            });
        } catch (error) {
            next(error);
        }
    });

    router.put("/update/:idEpisodios", async function (req, res, next) {
        const { body: data } = req;
        const { idEpisodios } = req.params;
        try {
            const episodios = await episodioServices.update(data, idEpisodios);
            res.status(200).json({
                episodios,
                msg: episodios ?
                    'episodiosaje encontrado' :
                    'no se encontro episodiosaje'
            });
        } catch (error) {
            next(error);
        }
    });

    router.post("/deleteEpisodio", async function (req, res, next) {
        const { body: data } = req;
        try {
            const episodios = await episodioServices.deleteEpisodio(data);
            res.status(200).json({
                episodios,
                msg: episodios ?
                    'episodiosaje encontrado' :
                    'no se encontro episodiosaje'
            });
        } catch (error) {
            next(error);
        }
    });
}
module.exports = EpisodiosApi;