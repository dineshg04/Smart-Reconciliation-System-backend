const express = require("express");
const startReconciliation = require("../controller/reconciliationController");
const authentication = require("../middleware/authentication");
const getReconciliationView = require("../controller/reconciliationviewController");
const roles = require("../middleware/roles");


const reconciliationrouter  = express.Router();


reconciliationrouter.post( "/start", authentication, roles("Admin", "Analyst"),
  startReconciliation
);

reconciliationrouter.get("/view/:uploadJobId", authentication, roles("Admin","Analyst","Viewer"),
getReconciliationView
);

module.exports = reconciliationrouter;