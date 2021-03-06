
const chalk = require('chalk')
const fs = require('fs-extra')
const spinner = require('./spinner')
const { getOutDirPath } = require('./files')
const downloadGitRepo = require('download-git-repo')
// https://github.com/LouisMazel/nuxt-prismic-template
const GITHUB_REPO = 'LouisMazel/nuxt-prismic-template'


function downloadRepo(repo, target, opts) {
  return fs.remove(target).then(
    () =>
      new Promise((resolve, reject) => {
        downloadGitRepo(repo, target, opts, err => {
          if (err) return reject(err)
          resolve()
        })
      })
  )
}

module.exports = async ({ outDir }) => {
  try {
    const outDirPath = getOutDirPath(outDir)
    console.log()
    console.log(
      chalk.bold(`✨ Generating Nuxt.js x Prismic project in`),
      chalk.bold.keyword('dodgerblue')(`${outDir}`),
      chalk.bold(`folder`),
    )
    spinner.start('Downloading project')
    await downloadRepo(GITHUB_REPO, outDirPath)
    // See https://saojs.org/api.html#standalone-cli
  } catch (e) {
    console.trace(e)
    throw new Error(`Error while generating project ${e}`)
  } finally {
    spinner.stop()
  }
}