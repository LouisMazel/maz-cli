const fs = require('fs')

module.exports = ({ outDir = 'maz', svgHTML }) => new Promise((resolve, reject) => {
    fs.appendFile(`${process.env.PWD}/${outDir}/assets/svg/logo.svg`, svgHTML, (err) => {
      if (err) reject(err)
      resolve('File is created successfully.')
    })
  })