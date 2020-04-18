const path = require('path')
const fs = require('fs')

module.exports = {
  getCurrentDirectoryBase: () => path.basename(process.cwd()),
  directoryExists: (filePath) => fs.existsSync(filePath)
}
