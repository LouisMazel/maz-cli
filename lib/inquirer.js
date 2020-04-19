const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = {
  askProjectInformations: (appName) => {
    const hasAppName = !!appName
    const questions = [
      {
        name: 'appDescription',
        type: 'input',
        message: 'Enter your app description.',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please enter a app description.'
        }
      },
      {
        name: 'appAuthor',
        type: 'input',
        message: 'Enter the app author name.',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please enter the app author name.'
        }
      },
      {
        name: 'appEmail',
        type: 'input',
        message: 'Enter your email.',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please your email.'
        }
      },
      {
        name: 'appPrimsicRepo',
        type: 'input',
        message: 'Your prismic repo name.',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please enter your prismic repo name.'
        }
      },
      {
        name: 'siteUrl',
        type: 'input',
        message: 'Your site public url.',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please enter your site public url.'
        }
      },
      {
        name: 'appInstaller',
        type: 'list',
        message: 'Select which packages you want use.',
        choices: ['NPM', 'Yarn']
      }
    ]
    if (!hasAppName) {
      questions.unshift({
        name: 'appName',
        type: 'input',
        message: 'Enter your app name',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please enter a app name.'
        }
      })
    } else {
      console.log(
        chalk.bold(`app name: `),
        chalk.bold.keyword('dodgerblue')(`${appName}`)
      )
    }

    return inquirer.prompt(questions)
  }
}