const mongoose = require("mongoose");

const auditlogSchema =  new mongoose.Schema(
    {
    recordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "record"
    },

    fieldName: String,

    oldValue: mongoose.Schema.Types.Mixed,
    newValue: mongoose.Schema.Types.Mixed,

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    source: {
      type: String,
      enum: ["System", "Manual", "Auto"]
    }
  },
  { timestamps: true }
) 

module.exports = mongoose.model("Auditlog" , auditlogSchema);