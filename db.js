const fs = require('fs');
const path = require('path');

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, filename)));
}
function writeJSON(filename, data) {
  fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(data, null, 2));
}

module.exports = { readJSON, writeJSON };