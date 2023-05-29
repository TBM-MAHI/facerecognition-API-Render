const express = require("express");
const bodyParser = require("express");
const bcrypt = require("bcrypt");
var cors = require("cors");
let app = express();
require('dotenv').config();
//importing API-endpoint functions 
let signin = require('./controller/signIn/signIn')
let register = require('./controller/Register/register')
let profile = require('./controller/profile/profile')
let image = require("./controller/imageEntry/image");
const PORT = process.env.PORT || 3001;
let saltRounds = 10;
//conncet to postgres SQL
const knex = require("knex")({
  client: "postgres",
  connection: {
    host: "postgres://mahi:7nfoNMtE0XZRJubfeSV4q8kOFmNyDZgV@dpg-chd1mrl269vdj68g8e70-a.oregon-postgres.render.com/facerecognition_mkxq",
    port: 5432,
    user: "mahi",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
  try {
    knex
      .select("*")
      .from("users")
      .then((data) => {
          console.log(data);
          res.send(200).json({ "data": data })
        })
  
  } catch (error) {
    res.status(400).json({ message: " Unable to fetch data from database"});
  }
  
});

app.post("/signin", signin.signInHandler(knex, bcrypt));

app.post("/register", (req, res) => {
 register.registerHandler(req, res, knex, bcrypt, saltRounds);
});
  
app.get("/profile/:idno", (req, res) => {
  profile.profileHandler(req, res, knex);
});

app.put("/image", (req, res) => {
  image.entryHandler(req,res,knex)
});
app.post('/imageAPIcall', (req, res) => {
  image.handleImgaeAPI(req, res)
})
app.listen( PORT, (req, res) => {
  console.log(`server is listening...at port ${PORT} `);
  console.log(process.env.MY_VAR); 

});

/*
/signin ==> POST = S/F
register ==> POST = newuser
/profile/:userid ==>GET= user 
/imagecount -->PUT --> count
 */
