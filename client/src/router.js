import Vue from "vue";
import VueRouter from "vue-router";

import session from "@/services/session";

import Login from "@/views/templates/Login.vue";

import Panel from "@/views/templates/Panel.vue";
import Dashboard from "@/views/pages/dashboard/Index.vue";

import CollectPoint from "@/views/pages/collect_points/CollectPoint.vue";
import CollectPointIndex from "@/views/pages/collect_points/Index.vue";

Vue.use(VueRouter);

function toPanelIfLogged(to, from, next) {
  var token = session.getToken();
  var user = session.getUser();

  if (token && token.length > 100 && user && user.id) {
    next("/panel");
  } else {
    next();
  }
}

function guard(to, from, next) {
  var token = session.getToken();
  var user = session.getUser();

  if (token && token.length > 100 && user && user.id) {
    next();
  } else {
    next("/login");
  }
}

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login,
    beforeEnter: toPanelIfLogged
  },
  {
    path: "/panel",
    component: Panel,
    beforeEnter: guard,
    children: [
      {
        path: "/",
        redirect: "/panel/dashboard"
      },
      {
        path: "dashboard",
        component: Dashboard,
        name: "dashboard",
        meta: { title: "Dashboard" }
      },
      {
        path: "collect-points",
        component: CollectPoint,
        children: [
          {
            path: "/",
            component: CollectPointIndex,
            name: "collect-points",
            meta: { title: "Pontos de Coleta" }
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
