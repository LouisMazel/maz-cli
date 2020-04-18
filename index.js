const path = require('path')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const { Command } = require('commander')
const program = new Command()
const sao = require('sao')
const VERSION = require('./package').version
// const generator = path.resolve(__dirname, './')
const generator = 'prismicio/nuxtjs-blog'

// const inquirer = require('./lib/inquirer.js')
// const files = require('./lib/files.js')
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
  .command('create [out-dir]')
  .description('run setup commands for all envs')
  .action((outDir = '.') => {
    console.log()
    console.log(chalk`{cyan create-nuxt-app v${VERSION}}`)
    console.log(chalk`✨  Generating Nuxt.js project in {cyan ${outDir}}`)
    // See https://saojs.org/api.html#standalone-cli
    sao({ generator, outDir })
      .run()
      .catch((err) => {
        console.trace(err)
        process.exit(1)
      })
  })

program.parse(process.argv)
