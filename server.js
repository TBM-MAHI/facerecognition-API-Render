const express = require("express");
const bodyParser = require("express");
const bcrypt = require("bcrypt");
var cors = require("cors");
let app = express();
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
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "mahi61",
    database: "facerecognition",
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get("/", (req, res) => {
  try {
    console.log(
      knex
        .select("*")
        .from("users")
        .then((data) => {
          console.log(data);
          res.json(data);
        })
    );
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
});

/*
/signin ==> POST = S/F
register ==> POST = newuser
/profile/:userid ==>GET= user 
/imagecount -->PUT --> count
 */
