const matchRecord = (uploaded, system) => {
  const mismatchedFields = [];
  const matchedFields = [];


  if (uploaded.transactionId === system.transactionId) {
    matchedFields.push("transactionId");
  } else {
    mismatchedFields.push("transactionId");
  }

 
  if (uploaded.referenceNumber === system.referenceNumber) {
    matchedFields.push("referenceNumber");
  } else {
    mismatchedFields.push("referenceNumber");
  }

  
  const diff = Math.abs(uploaded.amount - system.amount);
  const variance = diff / system.amount;

  if (variance <= 0.02) {
    matchedFields.push("amount");
  } else {
    mismatchedFields.push("amount");
  }

  
  let status = "Unmatched";

  if (mismatchedFields.length === 0) {
    status = "Matched";
  } else if (matchedFields.includes("transactionId")) {
    status = "Partially Matched";
  }

  return {
    status,
    matchedFields,
    mismatchedFields,
    amountVariance: diff
  };
};


module.exports = matchRecord;