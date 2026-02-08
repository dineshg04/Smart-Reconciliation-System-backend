
const Record = require("../models/Records");
const AuditLog = require("../models/Auditlog");

const correctRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId, amount, referenceNumber, date } = req.body;
    
    
    const record = await Record.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    const changes = [];
    
    if (transactionId && transactionId !== record.transactionId) {
      changes.push({
        fieldName: "transactionId",
        oldValue: record.transactionId,
        newValue: transactionId
      });
      record.transactionId = transactionId;
    }

    if (amount !== undefined && amount !== record.amount) {
      changes.push({
        fieldName: "amount",
        oldValue: record.amount,
        newValue: amount
      });
      record.amount = amount;
    }

    if (referenceNumber && referenceNumber !== record.referenceNumber) {
      changes.push({
        fieldName: "referenceNumber",
        oldValue: record.referenceNumber,
        newValue: referenceNumber
      });
      record.referenceNumber = referenceNumber;
    }

    if (date && date !== record.date?.toISOString()) {
      
      record.date = new Date(date);
    }

    
    await record.save();

  
    const auditLogs = changes.map(change => ({
      recordId: record._id,
      fieldName: change.fieldName,
      oldValue: change.oldValue,
      newValue: change.newValue,
      changedBy: req.user._id, 
      source: "Manual"
    }));

    if (auditLogs.length > 0) {
      await AuditLog.insertMany(auditLogs);
    }

    res.status(200).json({ 
      message: "Record updated successfully", 
      record,
      auditLogsCreated: auditLogs.length
    });

  } catch (err) {
    console.error("Error correcting record:", err);
    res.status(500).json({ message: "Failed to update record" });
  }
};

module.exports = correctRecord;