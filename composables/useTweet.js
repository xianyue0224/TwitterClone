import useFetchApi from "./useFetchApi"

export default () => {

  // 发推
  const postTweet = formData => {
    const form = new FormData()

    form.append("text", formData.text)

    formData.mediaFiles.forEach((mediaFile, index) => {
      form.append(`media_file_${index}`, mediaFile)
    })

    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: form
    })
  }

  // 获取HomeTweets
  const getHomeTweets = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { tweets } = await useFetchApi("/api/tweets", {
          method: "GET"
        })
        resolve(tweets)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 根据ID获取tweet详细信息
  const getTweetById = id => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await useFetchApi(`/api/tweets/${id}`)
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }


  return { postTweet, getHomeTweets, getTweetById }
}