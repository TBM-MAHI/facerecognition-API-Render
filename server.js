const express = require("express");
const bodyParser = require("express");
const bcrypt = require("bcrypt");
var cors = require("cors");
let app = express();
require("dotenv").config();
//importing API-endpoint functions
let signin = require("./controller/signIn/signIn");
let register = require("./controller/Register/register");
let profile = require("./controller/profile/profile");
let image = require("./controller/imageEntry/image");
let getallUserData = require("./controller/users");

const PORT = process.env.PORT || 3001;
let saltRounds = 10;

//connect to postgres SQL
const knex = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  getallUserData(req, res, knex);
});

app.post("/signin", signin.signInHandler(knex, bcrypt));

app.post("/register", (req, res) => {
  register.registerHandler(req, res, knex, bcrypt, saltRounds);
});

app.get("/profile/:idno", (req, res) => {
  profile.profileHandler(req, res, knex);
});

app.put("/image", (req, res) => {
  image.entryHandler(req, res, knex);
});
app.post("/imageAPIcall", (req, res) => {
  image.handleImgaeAPI(req, res);
});
app.listen(PORT, (req, res) =>
  console.log(`server is listening...at port ${PORT} `)
);

/*
/signin ==> POST = S/F
register ==> POST = newuser
/profile/:userid ==>GET= user 
/imagecount -->PUT --> count
 */
