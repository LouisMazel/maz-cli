#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const { Command } = require('commander')

const inquirer = require('./lib/inquirer')
const generate = require('./lib/generate-project')
const replace  = require('./lib/replace-variables')
const install  = require('./lib/install-dependencies')

const VERSION = require('./package').version
const NAME = require('./package').name
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

program
  .command('create [app-name]')
  .description('run setup commands for all envs')
  .action(async (appName) => {
    console.log()
    console.log(
      chalk.bold.keyword('dodgerblue')(`${NAME} v${VERSION}`)
    )
    console.log()
    const credentials = await inquirer.askProjectInformations(appName)
    const outDir = appName || credentials.appName
    const installer = credentials.appInstaller
    await generate({ outDir })
    await replace({ outDir, credentials })
    await install({ installer, outDir })
    console.log(
      chalk.bold(`✅ Project created in folfer`),
      chalk.bold.keyword('dodgerblue')(`"${outDir}"`)
    )
    console.log()
    console.log(chalk.bold(`Run project:`))
    console.log(
      chalk(`    cd ${outDir}`)
    )
    console.log(
      chalk(`    npm run serve`)
    )
    process.exit(0)
  })

program.parse(process.argv)
