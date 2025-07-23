import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://182.92.100.66:8000/',
  timeout: 5000, // 设置请求超时时间
})

export const setAuthToken = (token) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance
