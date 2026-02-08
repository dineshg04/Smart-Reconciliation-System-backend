

const AuditLog = require("../models/Auditlog");

const getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("recordId", "transactionId amount referenceNumber")
      .populate("changedBy", "name email");

    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch audit logs" });
  }
};


module.exports = getAllAuditLogs;