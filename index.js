const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const program = require('commander')

const inquirer = require('./lib/inquirer.js')
const files = require('./lib/files.js')

program
  .version(`@vue/cli ${require('../package').version}`)
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .description('create a new project powered by vue-cli-service')
  .option('-p, --preset <presetName>', 'Skip prompts and use saved or remote preset')
  .option('-d, --default', 'Skip prompts and use default preset')
  .option('-i, --inlinePreset <json>', 'Skip prompts and use inline JSON string as preset')
  .option('-m, --packageManager <command>', 'Use specified npm client when installing dependencies')
  .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
  .option('-g, --git [message]', 'Force git initialization with initial commit message')
  .option('-n, --no-git', 'Skip git initialization')
  .option('-f, --force', 'Overwrite target directory if it exists')
  .option('--merge', 'Merge target directory if it exists')
  .option('-c, --clone', 'Use git clone when fetching remote preset')
  .option('-x, --proxy', 'Use specified proxy when creating project')
  .option('-b, --bare', 'Scaffold project without beginner instructions')
  .option('--skipGetStarted', 'Skip displaying "Get started" instructions')
  .action((name, cmd) => {
    console.log('Maz-CLI', name, cmd)
  })

clear()

console.log(
  chalk.yellow(
    figlet.textSync('MAZ-CLI', { horizontalLayout: 'full' })
  )
)

if (files.directoryExists('.git')) {
  console.log(chalk.red('Already a Git repository!'))
}


const run = async () => {
  const credentials = await inquirer.askGithubCredentials()
  console.log(credentials)
}

run()