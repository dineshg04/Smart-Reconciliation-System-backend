const mongoose = require("mongoose");

const reconciliationresultSchema =  new mongoose.Schema(
    {
      uploadJobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Uploadjob"
  },
    recordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "record",
      required: true
    },

    systemRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "systemrecord"
    },

    status: {
      type: String,
      enum: ["Matched", "Partially Matched", "Unmatched", "Duplicate"],
      required: true
    },

    matchedFields: [String],
    mismatchedFields: [String],

    amountVariance: Number
  },
  { timestamps: true }

) 

module.exports = mongoose.model("Reconciliationresult" , reconciliationresultSchema);