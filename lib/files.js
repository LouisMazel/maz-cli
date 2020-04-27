const path = require('path')
const fs = require('fs')

module.exports = {
  getOutDirPath: (outDir) => path.resolve(process.cwd(), outDir),
  directoryExists: (filePath) => fs.existsSync(filePath),
  getCurrentDirectoryPath: () => path.resolve(process.cwd())
}
