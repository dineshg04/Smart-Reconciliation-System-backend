// routes/recordRoutes.js
const express = require("express");
const authentication = require("../middleware/authentication");
const roles = require("../middleware/roles");
const correctRecord = require("../controller/recordcorrectionController");



const recordcorrectionrouter = express.Router();

recordcorrectionrouter.put(
  "/correct/:id",
  authentication,
  roles("Admin", "Analyst"),
  correctRecord
);

module.exports = recordcorrectionrouter;