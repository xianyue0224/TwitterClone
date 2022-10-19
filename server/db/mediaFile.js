import { prisma } from './index'

export const createMediaFile = mediaData => {
  return prisma.mediafile.create({
    data: mediaData
  })
}