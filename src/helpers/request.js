//Reques básico sin autenticación
import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_PUBLIC, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

export default service
