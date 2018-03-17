// https://api.qwant.com/api/search/images?count=10&offset=1&q=cars

import * as got from 'got'
import {Message} from 'discord.js'

const apiEndpoint = 'https://api.qwant.com/api/search/images'

interface QwantItem {
  title: string
  type: string
  media: string
  desc: string
  thumbnail: string
  thumb_width: number
  thumb_height: number
  width: string
  height: string
  size: string
  url: string
  _id: string
  b_id: string
  media_fullsize: string
  thumb_type: string
  count: number
}

interface QwantResponse {
  status: string
  data: {
    query: {
      locale: string
      query: string
      offset: number
    }
    cache: {
      key: string
      created: number
      status: string
      age: number
    }
    result: {
      total: number
      items: QwantItem[]
    }
  }
}

export default (message: Message) => {
  const query = message.content.substr(7) // .image [query]

  if (query) {
    console.log('Getting random image for ' + query)

    const params = {
      q: query,
      count: 50,
      offset: 0,
      locale: 'en_en'
    }

    got(apiEndpoint, {
      json: true,
      query: params,
      retries: 5,
      followRedirect: true
    }).then((response) => {
      const qwant: QwantResponse = response.body

      if (qwant.status === 'success' && qwant.data.result.total > 0) {
        const images = qwant.data.result.items
        const image = images[Math.floor(Math.random() * images.length)]

        message.channel.send(`${image.media}\n(src: ${image.url})`)
      } else {
        message.channel.send(`No images found for ${query} 😅`)
      }
    }).catch((err) => {
      console.error(err)
      message.channel.send('Error fetching random image. Sorry 😰')
    })
  } else {
    message.channel.send('Invalid arguments for image command: please provide query')
  }
}
