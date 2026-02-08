const ReconciliationResult = require("../models/ReconciliationResult");


const getDashboardStats = async (req, res) => {
  const total = await ReconciliationResult.countDocuments();
  const matched = await ReconciliationResult.countDocuments({ status: "Matched" });
  const partial = await ReconciliationResult.countDocuments({ status: "Partially Matched" });
  const unmatched = await ReconciliationResult.countDocuments({ status: "Unmatched" });
  const duplicate = await ReconciliationResult.countDocuments({ status: "Duplicate" });

  const accuracy = total ? ((matched / total) * 100).toFixed(2) : 0;

  res.json({
    total,
    matched,
    partial,
    unmatched,
    duplicate,
    accuracy
  });
};

module.exports=getDashboardStats;