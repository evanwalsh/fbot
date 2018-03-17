import {Message} from 'discord.js'
import * as got from 'got'

interface GiphyGif {
  type: string
  id: string
  slug: string
  url: string
  bitly_gif_url: string
  bitly_url: string
  embed_url: string
  username: string
  source: string
  rating: string
  // Lots of other stuff omitted because I am lazy
}

interface GiphyResponse {
  data: GiphyGif[]
}

const apiKey = process.env.GIPHY_API_KEY
const apiEndpoint = 'https://api.giphy.com/v1/gifs/search'

export default (message: Message) => {
  const query = message.content.substr(5) // .gif [query]
 
  if (query) {
    console.log('Getting random GIF for ' + query)

    const params = {
      api_key: apiKey,
      q: query,
      limit: 50,
      offset: 0,
      rating: 'R',
      lang: 'en'
    }

    got(apiEndpoint, {
      json: true,
      query: params,
      retries: 5,
      followRedirect: true
    }).then((response) => {
      const giphyResponse: GiphyResponse = response.body
      const {data} = giphyResponse

      if (data && data.length > 0) {
        const image = data[Math.floor(Math.random() * data.length)]

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

