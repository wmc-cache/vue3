import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import SelectTest from "./views/SelectTest.vue";
import Violent from "./views/Violent.vue";
import store from "./store";
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { redirectAlreadyLogin: true },
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/violent",
      name: "violent",
      component: Violent,
      redirect: "/violent/all/:id",
      children: [
        {
          path: "all/:id",
          component: () => import("@/views/violent/EventTitle.vue"),
        },
        {
          path: "my",
          component: () => import("@/views/violent/My.vue"),
          redirect: "/violent/my/event/:id",
          children: [
            {
              path: "event/:id",
              component: () => import("@/views/violent/MyEvent.vue"),
            },
            {
              path: "comment/:id",
              component: () => import("@/views/violent/Comment.vue"),
            },
            {
              path: "reply/:id",
              component: () => import("@/views/violent/Reply.vue"),
            },
          ],
        },
        {
          path: "/eventdetail/:id",
          name: "eventdetail",
          component: () => import("@/views/violent/EventDetail.vue"),
        },
        {
          path: "/feedList",
          name: "feedList",
          component: () => import("@/views/violent/FeedList.vue"),
        }
      ],
    },
    {
      path: "/select",
      name: "select",
      component: SelectTest,
      meta: { requiredLogin: true },
    },
  ],
});
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

export default router;
