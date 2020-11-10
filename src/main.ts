import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://api.vikingship.xyz/api/'
axios.interceptors.request.use(config => {
  console.log("axios-request")
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  console.log("axios-response")
  return config
}, e => {
  console.log("axios-error",e.response.data)
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
