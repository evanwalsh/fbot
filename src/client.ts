import * as Discord from 'discord.js'
import commands from './commands'
import responders from './responders'

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}.`)
})

client.on('message', (message) => {
  if (message.author.bot) {
    return
  }

  if (message.content.startsWith('.')) {
    commands.execute(message)
  } else {
    responders.check(message)
  }
})

export default client
