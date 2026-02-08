const ReconciliationResult = require("../models/ReconciliationResult");
const Record = require("../models/Records");
const SystemRecord = require("../models/Systemrecords");
const Uploadjob = require("../models/Uploadjobs");


const matchRecord = require("./matchlogic");


const runReconciliation = async (uploadJobId) => {
  try {
    await Uploadjob.findByIdAndUpdate(uploadJobId, {
      status: "Processing"
    });

    const uploadedRecords = await Record.find({ uploadJobId });
    const systemRecords = await SystemRecord.find();

    for (const record of uploadedRecords) {
      const systemMatch = systemRecords.find(
        s => s.transactionId === record.transactionId
      );

      if (!systemMatch) {
        await ReconciliationResult.create({
          uploadJobId,
          recordId: record._id,
          status: "Unmatched"
        });
        continue;
      }
        
      const result = matchRecord(record, systemMatch);

      await ReconciliationResult.create({
        uploadJobId,
        recordId: record._id,
        systemRecordId: systemMatch._id,
        status: result.status,
        matchedFields: result.matchedFields,
        mismatchedFields: result.mismatchedFields,
        amountVariance: result.amountVariance
      });

       await Record.findByIdAndUpdate(record._id, {
      status: "Processed"
    });
    }

    await Uploadjob.findByIdAndUpdate(uploadJobId, {
      status: "Completed"
    });

  } catch (err) {
    await UploadJob.findByIdAndUpdate(uploadJobId, {
      status: "Failed"
    });
    console.error(err);
  }
};


module.exports= runReconciliation;