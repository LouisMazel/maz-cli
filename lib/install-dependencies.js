const spawn = require('cross-spawn')
const chalk = require('chalk')
const { getOutDirPath } = require('./files')

module.exports = async ({ installer, outDir }) => {
  try {
    const outDirPath = getOutDirPath(outDir)
    const cmd = installer === 'NPM' ? 'npm install --silent --no-progress' : 'yarn --silent'
    spawn.sync('git init', { stdio: 'inherit', shell: true, cwd: outDirPath })
    console.log(
      chalk.bold(`⚙️  Installing dependencies with ${installer}`)
    )
    spawn.sync(cmd, { stdio: 'inherit', shell: true, cwd: outDirPath })
  } catch (e) {
    throw new Error(`Install dependencies: ${e}`)
  }
}