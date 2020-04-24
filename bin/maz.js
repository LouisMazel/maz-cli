#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const { Command } = require('commander')

const inquirer = require('../lib/inquirer')
const generate = require('../lib/generate-project')
const replace = require('../lib/replace-variables')
const install = require('../lib/install-dependencies')

const VERSION = require('../package').version
const NAME = require('../package').name
// https://github.com/tj/commander.js
const program = new Command()

clear()
console.log(
  chalk.bold.keyword('dodgerblue')(
    figlet.textSync(NAME, { horizontalLayout: 'full' })
  )
)

program
  .version(`${NAME} ${VERSION}`)
  .usage('<command> [options]')

program
  .arguments('[command]')
  .action((cmd) => {
    program.outputHelp()
    if (cmd) {
      console.log()
      console.log(
        chalk.red(`  ⛔️ Unknown command ${chalk.bold.keyword('dodgerblue')(cmd)}.`)
      )
      console.log()
    }
  })

program.on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.bold.keyword('dodgerblue')(`maz <command> --help`)} for detailed usage of given command.`)
    console.log()
  })

program
  .command('create [app-name]')
  .description('To create Nuxt x Prismic')
  .action(async (appName) => {
    console.log()
    console.log(chalk.bold.keyword('dodgerblue')(`${NAME} v${VERSION}`))
    console.log()
    const credentials = await inquirer.askProjectInformations(appName)
    const outDir = appName || credentials.appName
    const installer = credentials.appInstaller
    await generate({ outDir })
    await replace({ outDir, credentials })
    await install({ installer, outDir })
    console.log(
      chalk.bold(`✅ Project created in folfer`),
      chalk.bold.keyword('dodgerblue')(`'${outDir}'`)
    )
    console.log()
    console.log(chalk.bold(`Run project:`))
    console.log(chalk(`    cd ${outDir}`))
    console.log(chalk(`    npm run serve`))
    process.exit(0)
  })

program.parse(process.argv)
