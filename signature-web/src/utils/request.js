import axios from 'axios'
import Qs from 'qs'

import { Toast } from 'mint-ui';

const service = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [data => {
    return Qs.stringify(data)
  }]
})


service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // console.log('err' + error) // for debug
    Toast({
      message: error.message,
      position: 'middle',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export default service
