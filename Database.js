const fs = require("fs");

function load(path) {
  return JSON.parse(fs.readFileSync(path));
}

function save(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { load, save };
