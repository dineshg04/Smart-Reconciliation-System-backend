const express= require("express");
const authentication = require("../middleware/authentication");
const getDashboardStats = require("../controller/dashbordController");
const roles = require("../middleware/roles");
const dashboardrouter = express.Router();




dashboardrouter.get("/stats", authentication, roles("Admin","Analyst","Viewer"), getDashboardStats);

module.exports = dashboardrouter;