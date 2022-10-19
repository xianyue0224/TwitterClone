import { prisma } from "."


export const createRefreshToken = refreshToken => {
  return prisma.refreshToken.create({
    data: refreshToken
  })
}

export const getRefreshTokenByToken = refreshToken => {
  return prisma.refreshToken.findUnique({
    where: {
      token: refreshToken
    }
  })
}