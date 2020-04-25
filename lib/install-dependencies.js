const spawn = require('cross-spawn')
const chalk = require('chalk')

module.exports = async ({ installer, outDir }) => {
  try {
    const cmd = installer === 'NPM' ? 'npm install --silent --no-progress' : 'yarn --silent'
    console.log(
      chalk.bold(`⚙️  Installing dependencies with ${installer}`)
    )
    spawn.sync(cmd, { stdio: 'inherit', shell: true, cwd: `./${outDir}` })
  } catch (e) {
    throw new Error(`Install dependencies: ${e}`)
  }
}