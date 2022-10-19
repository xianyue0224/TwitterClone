import formidable from 'formidable'
import { createMediaFile } from '~~/server/db/mediaFile'
import { createTweet } from '~~/server/db/tweet'
import { tweetTransformer } from '~~/server/transformers/tweet'
import { uploadToCloudinary } from '~~/server/utils/cloudinary'

// 处理发推的请求 /api/user/tweets
export default defineEventHandler(async event => {

  // 解析form-data格式的请求体
  const form = formidable({})

  const res = await new Promise((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })

  // 解构出新推有关的信息，其中files是新推的媒体资源，fields是新推的其他信息
  const { fields, files } = res

  // 这是一个需要用户登录才能使用的接口，用户信息会提前存在请求上下文中
  const userId = event.context?.auth?.user.id

  // 组装新推的数据
  const tweetData = {
    text: fields.text,
    authorId: userId
  }

  // 检查新推是否回复了旧推
  const replyToId = fields.replyToId

  if (replyToId && replyToId !== null) {
    tweetData.replyToId = replyToId
  }

  const tweet = await createTweet(tweetData)

  // 处理媒体资源
  const filePromises = Object.keys(files).map(async key => {
    const cloudinaryResource = await uploadToCloudinary(files[key].filepath)

    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId,
      tweetId: tweet.id
    })
  })

  await Promise.all(filePromises)

  return {
    tweet: tweetTransformer(tweet)
  }
})