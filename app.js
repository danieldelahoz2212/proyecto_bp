const express = require('express')
const config = require("./config/");
const bodyParser = require("body-parser")
const cors = require('cors');
const UserApi = require('./routes/usuario');
const EpisodiosApi = require('./routes/episodios');
const PersonApi = require('./routes/person');
const ParametroApi = require('./routes/parametro');
const app = express()

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

UserApi(app);
PersonApi(app);
EpisodiosApi(app);
ParametroApi(app);

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})