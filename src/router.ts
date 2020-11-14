import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import PostDetail from './views/PostDetail.vue'
import EditProfile from './views/EditProfile.vue'
import SelectTest from './views/SelectTest.vue'
import Violent from './views/Violent.vue'
import store from './store'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [

    {
      path: '/',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/home',
      name: 'home',
      component: Home

    },
    {
      path: '/violent',
      name: 'violent',
      component: Violent,
      redirect: '/violent/all',
      children: [
        {
          path: 'all',
          component: () => import('@/views/violent/EventTitle.vue')
        },
        {
          path: 'my',
          component: () => import('@/views/violent/My.vue'),
          redirect: '/violent/my/event',
          children: [
            {
              path: "event",
              component: () => import('@/views/violent/MyEvent.vue'),
            },
            {
              path: "comment",
              component: () => import('@/views/violent/Comment.vue'),
            },
            {
              path: "reply",
              component: () => import('@/views/violent/Reply.vue'),
            }

          ]
        },
        {
          path: '/eventdetail/:id',
          name: 'eventdetail',
          component: () => import('@/views/violent/EventDetail.vue')


        }
      ]

    },
    {
      path: '/select',
      name: 'select',
      component: SelectTest,
      meta: { requiredLogin: true }

    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostDetail
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditProfile,
      meta: { requiredLogin: true }
    },

  ]
})
// router.beforeEach((to, from, next) => {
//   const { user, token } = store.state
//   const { requiredLogin, redirectAlreadyLogin } = to.meta
//   if (!user.isLogin) {
//     if (token) {
//       axios.defaults.headers.common.Authorization = `Bearer ${token}`
//       store.dispatch('fetchCurrentUser').then(() => {
//         if (redirectAlreadyLogin) {
//           next('/')
//         } else {
//           next()
//         }
//       }).catch(e => {
//         console.error(e)
//         store.commit('logout')
//         next('login')
//       })
//     } else {
//       if (requiredLogin) {
//         next('login')
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (redirectAlreadyLogin) {
//       next('/')
//     } else {
//       next()
//     }
//   }
// })

export default router
