const mongoose = require("mongoose");

const uploadjobSchema =  new mongoose.Schema(

    {
    fileName: String,

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["Processing", "Completed", "Failed"],
      default: "Processing"
    },

    totalRecords: Number,
    processedRecords: Number,

    columnMapping: {
      transactionId: String,
      amount: String,
      referenceNumber: String,
      date: String
    },

    fileHash: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }

); 

module.exports = mongoose.model("Uploadjob" , uploadjobSchema);