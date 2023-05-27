import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response
    }
    return response
  },
  (error) => {
    localStorage.removeItem('token')
    throw error
  }
)

export default axiosClient
