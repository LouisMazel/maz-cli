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
// https://github.com/tj/commander.js
const program = new Command()

clear()
console.log(
  chalk.bold.keyword('dodgerblue')(
    figlet.textSync('@maz/cli', { horizontalLayout: 'full' })
  )
)

program
  .name('@maz/cli')
  .version(`@maz/cli ${VERSION}`)

program
  .command('create [app-name]')
  .description('run setup commands for all envs')
  .action(async (appName) => {
    console.log()
    console.log(
      chalk.bold.keyword('dodgerblue')(`@maz/cli v${VERSION}`)
    )
    console.log()
    const credentials = await inquirer.askProjectInformations(appName)
    const outDir = appName || credentials.appName
    const installer = credentials.appInstaller
    await generate({ outDir })
    await replace({ appName, credentials })
    await install({ installer, outDir })
    console.log(
      chalk.bold(`✅ Project created in folfer`),
      chalk.bold.keyword('dodgerblue')(`"${appName}"`)
    )
    process.exit(0)
  })

program.parse(process.argv)
