import { sendError } from 'h3'
import { getRefreshTokenByToken } from '~~/server/db/refreshTokens'
import { getUserById } from '~~/server/db/users'
import { decodeRefreshToken, generateTokens } from '~~/server/utils/jwt'

// 刷新access_token，如果请求携带的refresh_token未过期，正常返回一个刷新了时间的access_token，
// 否则返回400+错误
export default defineEventHandler(async event => {
  const cookies = useCookies(event)
  const refreshToken = cookies.refresh_token

  if (!refreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Refresh token is invaild"
    }))
  }

  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!rToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Refresh token is invaild"
    }))
  }

  const token = decodeRefreshToken(refreshToken)

  try {
    const user = await getUserById(token.userId)

    const { accessToken } = generateTokens(user)

    return {
      access_token: accessToken
    }
  } catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Something went wrong"
    }))
  }
})