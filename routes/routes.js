const express = require("express");
const bcrypt = require("bcrypt");
//connect to postgres SQL
let connect_DB = require('knex')(require('../dbConnect'));

let apiRouter = express.Router();

//importing API-endpoint controller functions 
let signin = require('../controller/signIn/signIn')
let register = require('../controller/Register/register')
let profile = require('../controller/profile/profile')
let image = require('../controller/imageEntry/image');
let getallUserData = require('../controller/users');

//for testing db
apiRouter.get("/all", (req, res, connect_DB) => {
    getallUserData(req, res, connect_DB);
});

apiRouter.post("/signin", signin.signInHandler(connect_DB, bcrypt));

apiRouter.post("/register", (req, res) => {
    register.registerHandler(req, res, connect_DB, bcrypt, saltRounds);
});

apiRouter.get('/profile/:idno', (req, res) => {
    profile.profileHandler(req, res, connect_DB);
});

apiRouter.put('/entries', (req, res) => {
    image.entryHandler(req, res, connect_DB)
});
apiRouter.post('/imageAPIcall', (req, res) => {
    image.handleImgaeAPI(req, res)
})

module.exports = apiRouter;