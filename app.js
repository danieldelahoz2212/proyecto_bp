const express = require('express')
const config = require("./config/");
const bodyParser = require("body-parser")
const router = express.Router();
const app = express()
app.use(bodyParser.json())
app.use("/prueba", router)
router.get('/', (req, res) => {
    res.send('Hello World Daniel!')
})

app.post('/parameters', (req, res) => {
    const body = req.body;
    body.status = 200
    console.log(body)
    res.send(body)
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})