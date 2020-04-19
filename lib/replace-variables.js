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

module.exports = async ({ appName, credentials }) => {
  const {
    appName: credAppName,
    appEmail,
    appAuthor,
    appDescription,
    appPrimsicRepo,
    siteUrl
  } = credentials

  const appProjectName = appName || credAppName

  const replaceOptions = {
    files: [`../${appProjectName}/package.json`, `../${appProjectName}/config/index.js`],
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
        from: /<%APP_SITE_URL%>/g,
        to: siteUrl
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
