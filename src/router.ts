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
      component: Login

    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiredLogin: true },
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
          meta: { requiredLogin: true },
        },
        {
          path: "my",
          component: () => import("@/views/violent/My.vue"),
          redirect: "/violent/my/event/:id",
          children: [
            {
              path: "event/:id",
              component: () => import("@/views/violent/MyEvent.vue"),
              meta: { requiredLogin: true },
            },
            {
              path: "comment/:id",
              component: () => import("@/views/violent/Comment.vue"),
              meta: { requiredLogin: true },
            },
            {
              path: "reply/:id",
              component: () => import("@/views/violent/Reply.vue"),
              meta: { requiredLogin: true },
            },
          ],
        },
        {
          path: "/eventdetail/:id",
          name: "eventdetail",
          component: () => import("@/views/violent/EventDetail.vue"),
          meta: { requiredLogin: true },
        },
        {
          path: "/feedList",
          name: "feedList",
          component: () => import("@/views/violent/FeedList.vue"),
          meta: { requiredLogin: true },
        }
      ],
    },
    {
      path: "/select",
      name: "select",
      component: SelectTest,
      meta: { requiredLogin: true },
    },
    {
      path: "/room/:id",
      name: "room",
      component: () => import("@/views/Room.vue"),
      meta: { requiredLogin: true },

    },

  ],
});



router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token")
  if ((to.name != "login")) {
    if (token) {
      //console.log(document.documentElement.scrollTop)
      document.documentElement.scrollTop = 0
      next()
    } else {
      next({ name: "login" })
    }
  }

  next()

})

export default router;
