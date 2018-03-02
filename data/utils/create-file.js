const fs = require("fs");

function createFile(filepath, value, json, done) {
  const data     = JSON.stringify(value, null, 2);
  const contents = json ? data : `module.exports = ${data}`;
  fs.writeFile(filepath, contents, "utf8", done);
}

module.exports = createFile;