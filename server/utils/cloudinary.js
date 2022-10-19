import { v2 as _cloudinary } from 'cloudinary'

const cloudinary = () => {
  const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = useRuntimeConfig()

  _cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret
  })

  return _cloudinary
}

export const uploadToCloudinary = image => {
  return new Promise((resolve, reject) => {
    cloudinary().uploader.upload(image, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}
