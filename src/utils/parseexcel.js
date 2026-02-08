
const xlsx = require("xlsx");
function parseExcel(buffer){
  const workbook = xlsx.read(buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx.utils.sheet_to_json(sheet);
}

module.exports ={ parseExcel  }
