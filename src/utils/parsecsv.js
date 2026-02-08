
const csv = require("csv-parser");
const stream = require("stream");

function parseCSV(buffer){
    return new Promise((resolve, reject) => {
    const results = [];
    const readable = new stream.Readable();
    readable.push(buffer);
    readable.push(null);

    readable
      .pipe(csv())
      .on("data", data => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

module.exports = {parseCSV};