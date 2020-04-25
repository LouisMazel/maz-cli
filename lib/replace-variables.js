const replace = require('replace-in-file')
const path = require('path')
const chalk = require('chalk')

const replaceVarInFile = async ({ file, from, to }) => {
  try {
    await replace({
      files: path.resolve(__dirname, file),
      from,
      to
    })
  } catch (e) {
    return e
  }
}

const replaceInFiles = async (config) => {
  const { files, replaces } = config
  try {
    for (const file of files) {
      for (const replace of replaces) {
        const { from, to } = replace
        await replaceVarInFile({ file, from, to })
      }
    }
  } catch (e) {
    return e
  }
}

module.exports = async ({ outDir, allinfos }) => {
  const {
    appName,
    appEmail,
    appAuthor,
    appDescription,
    appPrimsicRepo,
    productionUrl,
    appColorPrimary,
    appColorSecondary,
    // appDarkTheme,
    appEmailing,
    mailgunDomain,
    mailgunApiKey,
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    appPhone,
    appPhonePrefixed,
  } = allinfos

  const appProjectName = outDir || appName

  const replaceOptions = {
    files: [`../${appProjectName}/package.json`, `../${appProjectName}/config/index.js`, `../${appProjectName}/assets/scss/_override-maz-ui-vars.scss`],
    replaces: [
      {
        from: /<%APP_NAME%>/g,
        to: appProjectName
      },
      {
        from: /<%APP_DESCRIPTION%>/g,
        to: appDescription
      },
      {
        from: /<%APP_AUTHOR%>/g,
        to: `${appAuthor} <${appEmail}>`,
      },
      {
        from: /<%APP_EMAIL%>/g,
        to: appEmail
      },
      {
        from: /<%APP_PRISMIC_REPO%>/g,
        to: appPrimsicRepo
      },
      {
        from: /<%APP_PRODUCTION_URL%>/g,
        to: productionUrl
      },
      {
        from: /<%APP_PRIMARY_COLOR%>/g,
        to: appColorPrimary
      },
      {
        from: /<%APP_SECONDARY_COLOR%>/g,
        to: appColorSecondary
      },
      {
        from: /<%APP_SMTP_HOST%>/g,
        to: smtpHost || ''
      },
      {
        from: /<%APP_SMTP_PORT%>/g,
        to: smtpPort || 587
      },
      {
        from: /<%APP_SMTP_USER%>/g,
        to: smtpUser || ''
      },
      {
        from: /<%APP_SMTP_PASS%>/g,
        to: smtpPass || ''
      },
      {
        from: /<%APP_MAILGUN_DOMAIN%>/g,
        to: mailgunDomain || ''
      },
      {
        from: /<%APP_MAILGUN_APIKEY%>/g,
        to: mailgunApiKey || ''
      },
      {
        from: /<%APP_CLIENT_EMAIL%>/g,
        to: appEmailing
      },
      {
        from: /<%APP_PHONE%>/g,
        to: appPhone || ''
      },
      {
        from: /<%APP_PHONE_PREFIXED%>/g,
        to: appPhonePrefixed || ''
      }
    ]
  }
  try {
    console.log(
      chalk.bold(`♻️  Replacing variables`)
    )
    await replaceInFiles(replaceOptions)
  } catch (e) {
    throw new Error(`Replace variables: ${e}`)
  }
}
