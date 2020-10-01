import Vue from "vue";
import VueRouter from "vue-router";

import session from "@/services/session";

import Login from "@/views/templates/Login.vue";

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

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login,
    beforeEnter: toPanelIfLogged
  }
];

const router = new VueRouter({
  routes
});

export default router;
