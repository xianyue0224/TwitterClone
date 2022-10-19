import { getUserByUsername } from "~~/server/db/users"
import bcrypt from 'bcrypt'
import { generateTokens, sendRefreshToken } from "~~/server/utils/jwt"
import { createRefreshToken } from "~~/server/db/refreshTokens"
import { userTransformer } from '~~/server/transformers/user'
import { sendError } from 'h3'

export default defineEventHandler(async event => {
  const { username, password } = await useBody(event)

  if (!username || !password) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Ivalid params!"
    }))
  }

  // 验证用户是否已注册
  const user = await getUserByUsername(username)

  // 比较密码
  const doesThePasswordMatch = await bcrypt.compare(password, user.password)

  if (!user || !doesThePasswordMatch) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Username or password is invalid"
    }))
  }

  // 生成Token
  // 访问令牌 Access Token
  // 刷新令牌 Refresh Token

  // 生成两种Token
  const { accessToken, refreshToken } = generateTokens(user)

  // 存储RefreshToken
  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  // 将RefreshToken种在cookie中
  sendRefreshToken(event, refreshToken)

  return {
    access_token: accessToken,
    user: userTransformer(user)
  }
})