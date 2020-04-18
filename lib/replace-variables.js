const replace = require('replace-in-file')

module.exports = async ({ appName, credentials }) => {
  const { projectEmail } = credentials
  const REPLACE_OPTIONS = {
    files: `./${appName}/config/index.js`,
    from: /<YOUR_EMAIL>/g,
    to: projectEmail,
  }
  try {
    const resultReplace = await replace(REPLACE_OPTIONS)
    console.log('resultReplace', resultReplace)
  } catch (e) {
    throw new Error('Error while replacing variables')
  }
}
