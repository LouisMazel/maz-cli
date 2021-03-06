const path = require('path')
const TextToSVG = require('text-to-svg')

module.exports = async ({ appName = 'maz', logoColor = 'dodgerblue'}) => {
  const textToSVG = await TextToSVG.loadSync(path.resolve(__dirname, './fonts/geomanist-book.woff'))
  const attributes = { fill: logoColor, stroke: logoColor }
  const options = {fontSize: 50, anchor: 'left top', letterSpacing: 0, attributes}

  const svg = textToSVG.getSVG(appName, options)

  return svg
}
