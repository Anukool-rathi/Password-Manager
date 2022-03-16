const express = require("express");
const {isLoggedIn} = require("../middleware");
const {renderIndex, renderAdd, addPassword, getKey, showPassword, renderConfirm, deletePassword, renderEdit, updatePassword} = require("../controllers/userController");

const userRouter = express.Router();

userRouter
    .route("/")
    .get(isLoggedIn, renderIndex);

userRouter
    .route("/add")
    .get(isLoggedIn, renderAdd)
    .post(isLoggedIn, addPassword);

userRouter
    .route("/delete")
    .get(isLoggedIn, renderConfirm)
    .post(isLoggedIn, deletePassword);

userRouter
    .route("/:id")
    .get(isLoggedIn, getKey)
    .post(isLoggedIn, showPassword);

userRouter
    .route("/edit/:id")
    .get(isLoggedIn, renderEdit)
    .post(isLoggedIn, updatePassword)

module.exports = userRouter;