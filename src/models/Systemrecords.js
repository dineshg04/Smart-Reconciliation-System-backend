const mongoose = require("mongoose");

const systemrecordSchema =  new mongoose.Schema(
    {
    transactionId: {
      type: String,
      index: true
    },

    amount: Number,

    referenceNumber: {
      type: String,
      index: true
    },

    date: Date
  },
  { timestamps: true }

) 

module.exports = mongoose.model("systemrecord" , systemrecordSchema);