const { get } = require('superagent')
const cheerio = require('cheerio')

module.exports = async (url) => {
  const { text } = await get(url)
  const $ = cheerio.load(text)

  const kcal = parseFloat($('td')[1].children[0].data.normalize().replace('Kcal', ''))

  const menu = []
  $('td')[2].children[1].children.forEach((e, i) => {
    if (e.type === 'text') {
      menu[menu.length] = e.data.normalize().trim()
    }
  })

  return { kcal, menu }
}
