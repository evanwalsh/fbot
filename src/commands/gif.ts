import axios from 'axios'
import {Message} from 'discord.js'
import * as qs from 'querystring'

const apiKey = process.env.GIPHY_API_KEY
const apiEndpoint = 'https://api.giphy.com/v1/gifs/search'

export default (message: Message) => {
  const query = message.content.substr(5) // .gif [query]
 
  if (query) {
    console.log('Getting random GIF for ' + query)

    const params = qs.stringify({
      api_key: apiKey,
      q: query,
      limit: 50,
      offset: 0,
      rating: 'R',
      lang: 'en'
    })

    axios.get(`${apiEndpoint}?${params}`).then((response) => {
      if (response.data.data && response.data.data.length > 0) {
        const images = response.data.data
        const image = images[Math.floor(Math.random() * images.length)]

        message.channel.send(image.url)
      } else {
        message.channel.send(`No GIFs found for ${query} 😅`)
      }
    }).catch((err) => {
      console.error(err)
      message.channel.send('Error fetching random GIF. Sorry 😰')
    })
  } else {
    message.channel.send('Invalid arguments for GIF command: please provide query')
  }
}

