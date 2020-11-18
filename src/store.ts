import { createStore, Commit } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'
import { arrToObj, objToArr } from './helper'
import Select from 'ant-design-vue/lib/vc-select'
export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}
interface ListProps<P> {
  [id: string]: P;
}
export interface GlobalColumnsProps {
  data: ListProps<ColumnProps>;
  currentPage: number;
  total?: number;
}
export interface GlobalPostsProps {
  data: ListProps<PostProps>;
  loadedColumns: ListProps<{ total?: number; currentPage?: number }>;
}
export interface GlobalDataProps {
  token: string | null;
  error: GlobalErrorProps;
  loading: boolean;
  columns: GlobalColumnsProps;
  posts: GlobalPostsProps;
  user: UserProps;
  pushEventDialog: boolean;
  uploadImg: [];
  showModel: boolean;
  feedModel:boolean
  projectList: []
}

//通用接口请求
//url mutationName commit config  extraData?
const asyncAndCommit = async (url: string, mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: 'get' },
  extraData?: any) => {
  const { data } = await axios(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}

const store = createStore<GlobalDataProps>({
  //全局数据
  state: {
    token: localStorage.getItem('token') || null,
    error: { status: false },
    loading: false,
    columns: { data: {}, currentPage: 0 },
    posts: { data: {}, loadedColumns: {} },
    user: { isLogin: false },
    pushEventDialog: false,
    uploadImg: [],
    showModel: false,
    feedModel:false,
    projectList: []
  },




  //commit  最小原子性操作
  mutations: {
    createPushEventDialog(state) {
      state.pushEventDialog = true
    },
    cancelPushEventDialog(state) {
      state.pushEventDialog = false
    },
    patchUploadImg(state, data) {
      state.uploadImg = data
    },
    showModel(state) {
      state.showModel = true
    },
    cancelModel(state) {
      state.showModel = false
    },
    showFeedModel(state) {
      state.feedModel = true
    },
    cancelFeedModel(state) {
      state.feedModel = false
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    //登录(token)
    login(state, rawData) {
      //console.log("token", rawData)
      //console.log("state", state)
      //console.log("login:", rawData)
      const token = rawData.authorization
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    //获取用户信息
    fetchCurrentUser(state, rawData) {
        console.log( rawData)
      state.user = { isLogin: true, ...rawData }
    },
    updateUser(state, { data }) {
      state.user = { isLogin: true, ...data }
    },
    logout(state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization
    },
    createProject(state, { data }) {
      console.log(data)

    },
    selectProject(state, { data }) {
      state.projectList = data

    }
  },


  //可以异步操作
  actions: {
    updateUser({ commit }, { id, payload }) {
      return asyncAndCommit(`/user/${id}`, 'updateUser', commit, { method: 'patch', data: payload })
    },
    //登录
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    //url mutationName commit config  extraData?
    //登录part1(token)
    login({ commit }, payload) {
      return asyncAndCommit('/school/login', 'login', commit, { method: 'post', data: payload })
    },
    //登录part2(用户信息)
    fetchCurrentUser({ commit }) {
      //console.log("info")
      return asyncAndCommit('/school/info', 'fetchCurrentUser', commit)

    },
    createProject({ commit }, data) {
      return asyncAndCommit('/school/project', 'createProject', commit, { method: 'post', data: data })
    },
    selectProject({ commit }, data) {
      return asyncAndCommit('/school/selectProject', 'selectProject', commit, { method: 'post', data: data })


    }
  },

  //计算属性
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id]
    },
    getPostsByCid: (state) => (cid: string) => {
      return objToArr(state.posts.data).filter(post => post.column === cid).sort((a, b) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      })
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id]
    },
    getPostsCountByCid: (state) => (cid: string) => {
      if (state.posts.loadedColumns[cid]) {
        return state.posts.loadedColumns[cid].total
      } else {
        return 0
      }
    },
    getPostsCurrentPageByCid: (state) => (cid: string) => {
      if (state.posts.loadedColumns[cid]) {
        return state.posts.loadedColumns[cid].currentPage
      } else {
        return 0
      }
    }
  }
})

export default store
