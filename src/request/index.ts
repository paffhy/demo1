import axios from 'axios'
const service = axios.create({
  baseURL: 'http://111.230.205.161/demo1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})
service.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  if (localStorage.getItem('token')) {
    typeof config.headers.set === 'function' &&
      config.headers.set('Authorization', localStorage.getItem('token'))
  }
  return config
})
service.interceptors.response.use(
  (res) => {
    const code: number = res.data.code
    if (code !== 200) {
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    console.log(err)
  }
)

export default service
