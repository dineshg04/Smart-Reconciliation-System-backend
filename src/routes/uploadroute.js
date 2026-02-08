const express = require('express');

const upload = require("../middleware/upload");
const uploadfile = require("../controller/uploadController");
const authentication = require('../middleware/authentication');
const roles = require('../middleware/roles');

const uploadrouter= express.Router();


uploadrouter.post("/upload",authentication,roles("Admin","Analyst"),upload.single("file"),uploadfile);


module.exports= uploadrouter;