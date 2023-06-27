import axios from 'axios'
import { getEnvVars } from '../helpers'

const { VITE_API_URL } = getEnvVars()

const calendarApi = axios.create({
  baseURL: VITE_API_URL
})

// Para que todas las requests en el API utilice este token
calendarApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }

  return config
})

export default calendarApi
