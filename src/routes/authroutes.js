const express = require('express');
const authrouter = express.Router();
const {login,register} = require("../controller/authController");

authrouter.post("/register",register);
authrouter.post("/login",login);

module.exports= authrouter;
