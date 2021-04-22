const { Client, MessageEmbed } = require('discord.js')
const crawl = require('./utils/crawl')

const BASE_URL = 'http://school.gyo6.net/gbsw/food/'

const client = new Client()

client.on('message', async (msg) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith('!')) return

  const date = new Date()

  const [cmd, month, date2] = msg.content.split(' ')

  if (month) date.setMonth(parseInt(month) - 1)
  if (date2) date.setDate(parseInt(date2))
  
  switch (cmd) {
    case '!아침': {
      const data = await crawl(BASE_URL + [date.getFullYear(), date.getMonth() + 1, date.getDate(), 'breakfast'].join('/'))

        msg.channel.send(new MessageEmbed({
          color: 0x00A2D6,
          title: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 아침`,
          description: data.menu.join('\n'),
          footer: { text: `총 ${data.kcal} Kcal` }
        }))
      break
    }
    
    case '!점심': {
      const data = await crawl(BASE_URL + [date.getFullYear(), date.getMonth() + 1, date.getDate(), 'lunch'].join('/'))

      msg.channel.send(new MessageEmbed({
        color: 0x00A2D6,
        title: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 점심`,
        description: data.menu.join('\n'),
        footer: { text: `총 ${data.kcal} Kcal` }
      }))
      break
    }
    
    case '!저녁': {
      const data = await crawl(BASE_URL + [date.getFullYear(), date.getMonth() + 1, date.getDate(), 'dinner'].join('/'))

      msg.channel.send(new MessageEmbed({
        color: 0x00A2D6,
        title: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 저녁`,
        description: data.menu.join('\n'),
        footer: { text: `총 ${data.kcal} Kcal` }
      }))
      break
    }
  }
})

client.login(process.env.TOKEN)