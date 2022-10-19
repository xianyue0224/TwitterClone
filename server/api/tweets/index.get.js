import { getTweets } from "~~/server/db/tweet"
import { tweetTransformer } from "~~/server/transformers/tweet"

export default defineEventHandler(async event => {

  const tweets = await getTweets({
    include: {
      author: true,
      mediaFiles: true,
      replies: {
        include: {
          author: true
        }
      },
      replyTo: {
        include: {
          author: true
        }
      }
    }
  })

  return {
    tweets: tweets ? tweets.map(tweetTransformer) : []
  }
})