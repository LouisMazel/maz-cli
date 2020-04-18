// const path = require('path')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const sao = require('sao')
const { Command } = require('commander')

const inquirer  = require('./lib/inquirer')
const replace  = require('./lib/replace-variables')

const VERSION = require('./package').version
const GITHUB_REPO = 'LouisMazel/nuxt-prismic-template'
const program = new Command()

clear()
console.log(
  chalk.bold.keyword('dodgerblue')(
    figlet.textSync('Maz-CLI', { horizontalLayout: 'full' })
  )
)

program

program
  .version(`@maz/cli ${VERSION}`)

program
  .command('create [project-name]')
  .description('run setup commands for all envs')
  .action(async (projectName) => {
    console.log(
      chalk.bold.keyword('dodgerblue')(`@maz/cli v${VERSION}`)
    )
    // See https://saojs.org/api.html#standalone-cli
    const credentials = await inquirer.askProjectInformations(projectName)
    const appName = projectName || credentials.projectName
    console.log(
      chalk`✨ Generating Nuxt.js x Prismic project in {cyan ${appName}}`
    )
    sao({ generator: GITHUB_REPO, outDir: appName })
      .run()
      .then(async () => {
        await replace({ appName, credentials })
        console.log(
          chalk.bold(`✅ Project created in folfer`),
          chalk.bold.keyword('dodgerblue')(`"${appName}"`)
        )
      })
      .catch((err) => {
        console.trace(err)
        process.exit(1)
      })
  })

program.parse(process.argv)
