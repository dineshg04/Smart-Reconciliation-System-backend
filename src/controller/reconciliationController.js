const runReconciliation = require("../services/reconciliation");

const startReconciliation = async (req, res) => {
  const { uploadJobId } = req.body;

  
  runReconciliation(uploadJobId); 

  res.json({
    message: "Reconciliation started"
  });
};

module.exports = startReconciliation;