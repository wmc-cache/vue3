import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://172.16.121.98:8001' : 'http://localhost:8001'
axios.interceptors.request.use(config => {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
  }
  console.log("axios-request")
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(config => {
  // if (config.headers.authorization) {
  //   localStorage.setItem("token", config.headers.authorization)
  // }
  store.commit('setLoading', false)
  console.log("axios-response")
  return config
}, e => {
  console.log("axios-error", e.response.data)
  const { message } = e.response.data
  console.log(e.response.data.message)
  store.commit('setError', { status: true, message: message })
  store.commit('setLoading', false)
  return Promise.reject(e.response.data)
})


const app = createApp(App)
app.use(Antd);
app.use(router)
app.use(store)
app.mount('#app')
