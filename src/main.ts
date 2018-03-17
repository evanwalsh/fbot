import * as dotenv from 'dotenv'
dotenv.config()

import client from './client'
import './commands'

client.login(process.env.BOT_TOKEN).then(() => {
  client.user.setPresence({
    status: 'online',
    afk: false,
    game: {
      name: '.help for commands'
    }
  })
})
