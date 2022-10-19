import useFetchApi from "./useFetchApi"
import jwt_decode from 'jwt-decode'

export default () => {
  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')
  const useAuthLoading = () => useState('auth_isloading', () => true)

  const setToken = newToken => { useAuthToken().value = newToken }

  const setUser = newUser => { useAuthUser().value = newUser }

  const setIsAuthLoading = value => { useAuthLoading().value = value }

  // 登录，使用用户名+密码去请求login接口，如果登录成功，客户端的cookie将被种下refresh_token，
  // 请求将会返回一个access_token和用户信息，客户端会将其持久化存储起来
  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password
          }
        })
        setToken(data.access_token)
        setUser(data.user)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 请求自动携带cookie，接口会自动从cookie中检出refresh_token，如果还没过期，会自动签发新的access_token
  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh")
        setToken(data.access_token)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 根据access_token获取对应的用户，然后将用户信息存储在客户端
  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi("/api/auth/user")
        setUser(data.user)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 重新刷新access_token，在token过期前一分钟自动刷新
  const reRefreshAccessToken = () => {
    const authToken = useAuthToken().value

    if (!authToken) return

    const jwt = jwt_decode(authToken)

    const newRefreshTime = jwt.exp - 60000

    setTimeout(() => {
      refreshToken() // 刷新访问令牌
      reRefreshAccessToken() // 重新刷新访问令牌
    }, newRefreshTime)
  }

  // 初始化登录鉴权信息，如果客户端有refresh_token且未过期，将会得到一个刷新了时间的access_token，
  // 然后根据access_token去获取用户信息，最后部署重刷新令牌的异步任务
  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsAuthLoading(true)
        // 刷新令牌
        await refreshToken()
        // 获取用户信息
        await getUser()
        // 部署重刷新异步任务
        reRefreshAccessToken()

        resolve(true)
      } catch (error) {
        reject(error)
      } finally {
        setIsAuthLoading(false)
      }
    })
  }

  return { login, useAuthUser, initAuth, useAuthToken, useAuthLoading }
}