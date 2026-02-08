const mongoose = require("mongoose");

const recordSchema =  new mongoose.Schema(
     {
    uploadJobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Uploadjob",
      index: true
    },

    transactionId: {
      type: String,
      index: true
    },

    amount: Number,

    referenceNumber: {
      type: String,
      index: true
    },

    date: Date,

    rawData: Object,

    status: {
      type: String,
      enum: ["Pending", "Processed"],
      default: "Pending"
    }
  },
  { timestamps: true }
) 

module.exports = mongoose.model("record" , recordSchema);