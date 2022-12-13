import axios from 'axios'
import cookie from 'js-cookie'

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'content-type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  const token = cookie.get('token_rgs_pt')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosClient

