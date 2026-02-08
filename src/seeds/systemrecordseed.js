const mongoose = require("mongoose");
require("dotenv").config();
const Systemrecords = require("../models/Systemrecords");
const connectDb = require("../config/db");
const data = [
  {
    "Txn Id": "TXN001",
    "Amt": "1500.50",
    "Ref No": "REF-ABC123",
    "Txn Date": "2025-01-15",
    "Description": "UPI Payment - Swiggy"
  },
  {
    "Txn Id": "TXN002",
    "Amt": "2750.00",
    "Ref No": "REF-XYZ789",
    "Txn Date": "2025-01-16",
    "Description": "Salary Credit"
  },
  {
    "Txn Id": "TXN003",
    "Amt": "890.75",
    "Ref No": "REF-DEF456",
    "Txn Date": "2025-01-17",
    "Description": "Amazon Purchase"
  },
  {
    "Txn Id": "TXN001",
    "Amt": "1500.50",
    "Ref No": "REF-ABC123",
    "Txn Date": "2025-01-15",
    "Description": "UPI Payment - Swiggy (retry)"
  },
  {
    "Txn Id": "TXN005",
    "Amt": "2762.50",
    "Ref No": "REF-XYZ789",
    "Txn Date": "2025-01-16",
    "Description": "Salary Credit (corrected)"
  },
  {
    "Txn Id": "TXN006",
    "Amt": "12000.00",
    "Ref No": "NEFT/HDFC/250120001",
    "Txn Date": "2025-01-20",
    "Description": "Vendor Payment - ABC Corp"
  },
  {
    "Txn Id": "TXN008",
    "Amt": "999.00",
    "Ref No": "POS/654321/Flipkart",
    "Txn Date": "2025-01-22",
    "Description": "Online Shopping"
  },
  {
    "Txn Id": "TXN010",
    "Amt": "180.50",
    "Ref No": "REF-JKL012",
    "Txn Date": "2025-01-24",
    "Description": "Zomato Order"
  },
  {
    "Txn Id": "TXN201",
    "Amt": "980.40",
    "Ref No": "REF-UVW345",
    "Txn Date": "2025-03-01",
    "Description": "Uber Ride - Airport"
  },
  {
    "Txn Id": "TXN202",
    "Amt": "6500.00",
    "Ref No": "REF-DEF678",
    "Txn Date": "2025-03-02",
    "Description": "Project Bonus"
  },
  {
    "Txn Id": "TXN203",
    "Amt": "2345.60",
    "Ref No": "REF-GHI901",
    "Txn Date": "2025-03-03",
    "Description": "Reliance Digital Purchase"
  },
  {
    "Txn Id": "TXN204",
    "Amt": "120.00",
    "Ref No": "REF-JKL234",
    "Txn Date": "2025-03-04",
    "Description": "Metro Card Recharge"
  },
  {
    "Txn Id": "TXN201",
    "Amt": "980.40",
    "Ref No": "REF-UVW345",
    "Txn Date": "2025-03-01",
    "Description": "Uber Ride - Airport (duplicate)"
  },
  {
    "Txn Id": "TXN205",
    "Amt": "6525.80",
    "Ref No": "REF-DEF678",
    "Txn Date": "2025-03-02",
    "Description": "Project Bonus (revised)"
  },
  {
    "Txn Id": "TXN206",
    "Amt": "45000.00",
    "Ref No": "NEFT/SBI/25030500789",
    "Txn Date": "2025-03-05",
    "Description": "Home Loan Disbursement"
  },
  {
    "Txn Id": "TXN207",
    "Amt": "-1800.00",
    "Ref No": "IMPS/250306/456789",
    "Txn Date": "2025-03-06",
    "Description": "Credit Card Payment"
  },
  {
    "Txn Id": "TXN208",
    "Amt": "399.00",
    "Ref No": "POS/123789/Swiggy",
    "Txn Date": "2025-03-07",
    "Description": "Food Order"
  },
  {
    "Txn Id": "TXN209",
    "Amt": "7500.00",
    "Ref No": "UPI/9012345678/GPay",
    "Txn Date": "2025-03-08",
    "Description": "Family Transfer Received"
  }
]


const columnMapping = {
  transactionId: "Txn Id",
  amount: "Amt",
  referenceNumber: "Ref No",
  transactionDate: "Txn Date",
  description: "Description"
};


 
  async function seed(){
        const records = data.map(row => ({
        transactionId: row[columnMapping.transactionId],
        amount: Number(row[columnMapping.amount]),
        referenceNumber: row[columnMapping.referenceNumber],
        transactionDate: row[columnMapping.transactionDate],
        description: row[columnMapping.description],
        rawData: row
    }));

      
    await Systemrecords.insertMany(records);
    console.log("✅ System records inserted");
    process.exit();
  }
(async()=>{
  connectDb();
seed();
})();
  