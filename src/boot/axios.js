import Vue from 'vue'
import axios from 'axios'

const http = axios.create({
  baseURL: process.env.apiUrl,
  params: {
    apikey: process.env.apiKey
  }
})

Vue.prototype.$axios = axios

export {
  axios,
  http
}
