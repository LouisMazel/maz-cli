const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = {
  askProjectInformations: (projectName) => {
    const hasProjectName = !!projectName
    const questions = [
      {
        name: 'projectDescription',
        type: 'input',
        message: 'Enter your project description',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please enter a project description.'
        }
      },
      {
        name: 'projectAuthor',
        type: 'input',
        message: 'Enter the project author name.',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please enter the project author name.'
        }
      },
      {
        name: 'projectEmail',
        type: 'input',
        message: 'Enter your email.',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please your email.'
        }
      }
    ]
    if (!hasProjectName) {
      questions.unshift({
        name: 'projectName',
        type: 'input',
        message: 'Enter your project name',
        validate( value ) {
          if (value.length) {
            return true
          }
          return 'Please enter a project name.'
        }
      })
    } else {
      console.log(
        chalk.bold(`Project name: `),
        chalk.bold.keyword('dodgerblue')(`${projectName}`)
      )
    }

    return inquirer.prompt(questions)
  }
}