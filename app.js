require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/views');

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {httpOnly: true}
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_URL,
                    {useNewUrlParser: true})
                    .then(()=>{
                        console.log("db connected");
                    })
                    .catch((err) =>{
                        console.log(err);
                    });

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.get("/", (req, res) =>{
    res.render("home");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
  });