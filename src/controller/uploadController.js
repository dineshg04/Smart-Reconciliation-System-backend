const Uploadjob = require("../models/Uploadjobs")
const Record = require("../models/Records");
const crypto = require("crypto");

const csv = require("csv-parser");
const stream = require("stream");
const xlsx = require("xlsx");
const { parseCSV } = require("../utils/parsecsv");
const { parseExcel } = require("../utils/parseexcel");





const uploadfile= async (req,res)=>{

try{
        
     const file = req.file;
    const columnMapping = JSON.parse(req.body.columnMapping);

    if (!file) {
      return res.status(400).json({ message: "File not provided" });
    }


    const fileHash = crypto
      .createHash("md5")
      .update(file.buffer)
      .digest("hex");

    
    const existing = await Uploadjob.findOne({ fileHash });
    if (existing) {
      return res.json({
        message: "File already uploaded",
        uploadJobId: existing._id
      });
    }

    const newuploadjob = await Uploadjob.create({
        
      fileName: file.originalname,
      uploadedBy: req.user.id,
      status: "Processing",
      columnMapping,
      fileHash

    })


    let rows = [];
    if (file.originalname.endsWith(".csv")) {
      rows = await parseCSV(file.buffer) ;
    } else {
      rows = await parseExcel(file.buffer);
    }
    console.log(rows);
    
    const newrecord = rows.map(row=>({
        uploadJobId: newuploadjob._id,
      transactionId: row[columnMapping.transactionId],
      amount: Number(row[columnMapping.amount]),
      referenceNumber: row[columnMapping.referenceNumber],
      date: row[columnMapping.date],
      rawData: row
    }));

    console.log(newrecord);
    await Record.insertMany(newrecord);

    newuploadjob.totalRecords= newrecord.length;
    newuploadjob.processedRecords=newrecord.length;
    await newuploadjob.save();

    res.status(201).json({
      message: "Upload successful",
      uploadJobId: newuploadjob._id
    });

}catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }


}



module.exports=uploadfile;