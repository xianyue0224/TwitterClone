import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt'
import { sendError } from 'h3'
import { getUserById } from '../db/users'

// 登录鉴权中间件，将需要鉴权的路由添加至endpoints数组中即可
export default defineEventHandler(async event => {
  const endpoints = [
    '/api/auth/user',
    '/api/user/tweets',
    '/api/tweets',
    '/api/tweets/:id',
  ]

  const isHandleByThisMiddleware = endpoints.some(endpoint => {
    const pattern = new UrlPattern(endpoint)

    return pattern.match(event.req.url)
  })

  if (!isHandleByThisMiddleware) {
    return
  }

  const token = event.req.headers['authorization']?.split(" ")[1]

  const decoded = decodeAccessToken(token)

  if (!decoded) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    }))
  }

  try {
    const userId = decoded.userId

    const user = await getUserById(userId)

    event.context.auth = { user }
  } catch (error) {
    return
  }
})