const express= require("express");
const authentication = require("../middleware/authentication");
const getAllAuditLogs = require("../controller/auditlogController");
const roles = require("../middleware/roles");
const auditRouter = express.Router();





auditRouter.get("/all", authentication, roles("Admin","Analyst","Viewer"),getAllAuditLogs);


module.exports = auditRouter;