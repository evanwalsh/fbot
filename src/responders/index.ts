import {Message} from 'discord.js'
import {sample} from 'lodash'

const responders = [
  {
    check: /Jason/i,
    response: 'Press X to Jason.'
  },
  {
    check: /Press X/i,
    response: 'JASON!'
  },
  {
    check: /bones/i,
    response: 'I ate the bones.'
  },
  {
    check: /finally/i,
    response: 'FINALLY'
  },
  {
    check: /\bklonopin|pill|tylenol|motrin|ibuprofen|acetaminophen|drug|advil\b/i,
    response: 'Don\'t do drugs'
  },
  {
    check: /\bjeek|geek\b/i,
    response: 'https://youtu.be/EQ1HanRqiHM\nI\'m a reel jeek'
  },
  {
    check: /\bdirty bird\b/,
    response: 'https://i.imgur.com/5ZQkxk0.gif'
  },
  {
    check: /\banime\b/,
    response: 'https://i.imgur.com/XF4YtpT.gif'
  }
]

export default {
  check (message: Message) {
    const responder = responders.find((responder) => {
      return !!message.content.match(responder.check)
    })

    if (responder) {
      let response: string
      if (Array.isArray(responder.response)) {
        response = sample(responder.response)
      } else {
        response = responder.response
      }

      message.channel.send(response)
    }
  }
}
