const express = require("express");
const {renderLogin, login, renderRegister, register, logout} = require("../controllers/authController");

const authRouter = express.Router();

authRouter
    .route("/login")
    .get(renderLogin)
    .post(login);

authRouter
    .route("/register")
    .get(renderRegister)
    .post(register);

authRouter
    .route("/logout")
    .get(logout);


module.exports = authRouter;