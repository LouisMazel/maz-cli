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
        default: 'My awesome Nuxt x Prismic project',
        validate(value) {
          if (value.length) return true
          return 'Please enter a app description.'
        },
      },
      {
        name: 'appAuthor',
        type: 'input',
        message: 'Enter the app author name.',
        default: 'Louis Mazel',
        validate(value) {
          if (value.length) return true
          return 'Please enter the app author name.'
        },
      },
      {
        name: 'appEmail',
        type: 'input',
        message: 'Enter your email.',
        default: 'name@domain.com',
        validate(value) {
          if (value.length) return true
          return 'Please your email.'
        },
      },
      {
        name: 'appPrimsicRepo',
        type: 'input',
        message: 'Your prismic repo name.',
        default: 'maz-demo',
        validate(value) {
          if (value.length) return true
          return 'Please enter your prismic repo name.'
        },
      },
      {
        name: 'productionUrl',
        type: 'input',
        message: 'Your production site url (or future).',
        default: 'https://louismazel.github.io',
        validate(value) {
          if (value.length) return true
          return 'Please enter your site public url.'
        },
      },
      {
        name: 'appColorPrimary',
        type: 'input',
        message: 'Primary color (HEX or Color name)',
        default: 'dodgerblue',
        validate(value) {
          if (value.length) return true
          return 'Please enter your site public url.'
        },
      },
      {
        name: 'appColorSecondary',
        type: 'input',
        message: 'Secondary color (HEX or Color name)',
        default: 'dodgerblue',
        validate(value) {
          if (value.length) return true
          return 'Please enter your primary color.'
        },
      },
      {
        name: 'appDarkTheme',
        type: 'confirm',
        message: 'Do you want use dark theme ?'
      },
      {
        name: 'appEmailing',
        type: 'list',
        message: 'Choose your client e-mail type (mailgun or any smtp client)',
        choices: ['None', new inquirer.Separator(), 'mailgun', 'smtp'],
      }
    ]
    if (!hasAppName) {
      questions.unshift({
        name: 'appName',
        type: 'input',
        message: 'Enter your app name',
        default: 'maz',
        validate(value) {
          if (value.length) return true
          return 'Please enter a app name.'
        },
      })
    } else {
      console.log(
        chalk.bold(`app name: `),
        chalk.bold.keyword('dodgerblue')(`${appName}`)
      )
    }

    return inquirer.prompt(questions)
  },
  askClientEmailCredentials: (clientEmail) => {
    const questions = []
    if (clientEmail === 'mailgun') {
      questions.push({
        name: 'mailgunDomain',
        type: 'input',
        message: 'Provide your mailgun domain.',
        validate(value) {
          if (value.length) return true
          return 'Please provide your mailgun domain.'
        },
      }, {
        name: 'mailgunApiKey',
        type: 'password',
        mask: true,
        message: 'Provide your mailgun api_key.',
        validate(value) {
          if (value.length) return true
          return 'Please provide your mailgun api_key.'
        },
      })
    } else if (clientEmail === 'smtp') {
      questions.push({
        name: 'smtpHost',
        type: 'input',
        message: 'Provide your SMTP host.',
        validate(value) {
          if (value.length) return true
          return 'Please provide your SMTP host.'
        },
      }, {
        name: 'smtpPort',
        type: 'input',
        message: 'Provide your SMTP port.',
        default: 587,
        validate: function(value) {
          const valid = !isNaN(parseFloat(value))
          return valid || 'Please enter a valid number'
        },
        filter: Number
      }, {
        name: 'smtpUser',
        type: 'input',
        message: 'Provide your SMTP auth user (email or username of your client email account).',
        validate(value) {
          if (value.length) return true
          return 'Please provide your SMTP auth user.'
        },
      }, {
        name: 'smtpPass',
        type: 'password',
        mask: true,
        message: 'Provide your SMTP auth password.',
        validate(value) {
          if (value.length) return true
          return 'Please provide your SMTP auth password.'
        },
      })
    }
    return inquirer.prompt(questions)
  },
  askInstaller: () => {
    return inquirer.prompt([{
      name: 'installer',
      type: 'list',
      message: 'Select which packages you want use.',
      choices: ['NPM', 'Yarn'],
    }])
  }
}
