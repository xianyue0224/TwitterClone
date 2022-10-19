import jwt from 'jsonwebtoken'

const { jwtAccessSecret, jwtRefreshSecret } = useRuntimeConfig()

const generateAccessToken = user => jwt.sign({ userId: user.id }, jwtAccessSecret, { expiresIn: "10m" })

const generateRefreshToken = user => jwt.sign({ userId: user.id }, jwtRefreshSecret, { expiresIn: "4h" })


export const generateTokens = user => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  return {
    accessToken,
    refreshToken
  }
}

export const sendRefreshToken = (event, token) => {
  setCookie(event.res, "refresh_token", token, {
    httpOnly: true,
    sameSite: true
  })
}

export const decodeRefreshToken = token => {
  try {
    return jwt.verify(token, jwtRefreshSecret)
  } catch (error) {
    return null
  }
}

export const decodeAccessToken = token => {
  try {
    return jwt.verify(token, jwtAccessSecret)
  } catch (error) {
    return null
  }
}