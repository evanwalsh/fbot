import {Message} from 'discord.js'
import {sample} from 'lodash'

const oms = [
  'https://i.imgur.com/7bqlezy.gif',
  'https://i.imgur.com/jQllSmf.gif',
  'https://i.imgur.com/jDD3LcF.gif',
  'https://i.imgur.com/82CGQf9.gif',
  'https://cdn.discordapp.com/attachments/422754982841024512/423557489087348747/om-1.gif',
  'https://cdn.discordapp.com/attachments/422754982841024512/423557528048369685/om.gif',
  'https://cdn.discordapp.com/attachments/422754982841024512/423557575070449665/om5.gif'
]

export default (message: Message) => {
  message.channel.send(sample(oms))
}
