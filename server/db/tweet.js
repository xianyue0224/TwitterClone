import { prisma } from './index'

export const createTweet = tweetData => prisma.tweet.create({ data: tweetData })


export const getTweets = params => prisma.tweet.findMany({ ...params })


export const getTweetById = (id, params = {}) => prisma.tweet.findUnique({
  ...params,
  where: {
    ...params.where,
    id
  }
})