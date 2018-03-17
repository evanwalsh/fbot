import {Message} from 'discord.js'
import gif from './gif'
import image from './image'
import ping from './ping'
import om from './om'

type Command = (message: Message) => void
type Commands = {
  [name: string]: Command
}
type Help = {
  [command: string]: string
}
type Aliases = {
  [name: string]: string
}

const commands = {
  commands: {} as Commands,
  help: {} as Help,
  aliases: {} as Aliases,
  register (name: string, description: string, command: Command) {
    this.help[name] = description
    this.commands[name] = command
  },
  registerAlias (name: string, description: string, command: string) {
    this.help[name] = description
    this.aliases[name] = command
  },
  execute (message: Message) {
    const commandParts = message.content.substring(1).split(' ')
    const command = commandParts[0]
    if (this.commands[command]) {
      this.commands[command](message)
    } else if (this.aliases[command]) {
      const fullAliasedCommand = this.aliases[command]
      const aliasParts = fullAliasedCommand.substring(1).split(' ')
      const alias = aliasParts[0]

      message.content = fullAliasedCommand

      this.commands[alias](message)
    } else if (command === 'help') {
      message.author.createDM().then((dmChannel) => {
        const helpMessages = Object.keys(this.help).map((c) => {
          return `**.${c}**: ${this.help[c]}`
        })

        dmChannel.send(helpMessages.join('\n'))
      })

      message.reply('Sent help to DM!')
    }
  }
}

commands.register('gif', 'Get a random GIF from giphy.com', gif)
commands.register('image', 'Get a random image from qwant.com', image)
commands.register('ping', 'Check response time', ping)
commands.register('om', 'Get an Om', om)

commands.registerAlias('eyebleach', 'Get some eyebleach', '.gif cute animal')

export default commands
