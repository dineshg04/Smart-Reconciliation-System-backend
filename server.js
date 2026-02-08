const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./src/config/db');
require('dotenv').config();
const authrouter = require("./src/routes/authroutes");
const uploadrouter = require('./src/routes/uploadroute');
const dashboardrouter = require('./src/routes/dashboardroutes');
const reconciliationrouter = require('./src/routes/reconciliationroutes');
const auditRouter = require('./src/routes/auditlogroutes');
const recordcorrectionrouter = require('./src/routes/recordcorrectionroutes');



app.use(cors({origin:"*"}));
app.use(express.json());
app.use('/api/auth/',authrouter);
app.use('/api/auth/uploadfile/',uploadrouter);
app.use('/api/auth/dashboard/',dashboardrouter);
app.use('/api/auth/reconciliation/',reconciliationrouter);
app.use('/api/auth/auditlog/',auditRouter);
app.use('/api/auth/records', recordcorrectionrouter);


const PORT = process.env.PORT  || 5000 ;
 
connectDb();
app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`);
});