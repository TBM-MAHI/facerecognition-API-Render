const express = require("express");
let app = express();
let cors = require("cors");
require('dotenv').config();
const helmet = require("helmet");

let apiRouter = require('./routes/routes');

app.use(helmet());
app.use(express.json())
app.use(cors());
app.use(apiRouter);

module.exports = app;