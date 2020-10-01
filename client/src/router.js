import Vue from "vue";
import VueRouter from "vue-router";

import session from "@/services/session";

import Login from "@/views/templates/Login.vue";

import Panel from "@/views/templates/Panel.vue";
import Dashboard from "@/views/pages/dashboard/Index.vue";

import CollectPoint from "@/views/pages/collect_points/CollectPoint.vue";
import CollectPointIndex from "@/views/pages/collect_points/Index.vue";

import Doctor from "@/views/pages/doctors/Doctor.vue";
import DoctorIndex from "@/views/pages/doctors/Index.vue";

import Exam from "@/views/pages/exams/Exam.vue";
import ExamIndex from "@/views/pages/exams/Index.vue";

import Customer from "@/views/pages/customers/Customer.vue";
import CustomerIndex from "@/views/pages/customers/Index.vue";

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
      },
      {
        path: "doctors",
        component: Doctor,
        children: [
          {
            path: "/",
            component: DoctorIndex,
            name: "doctors",
            meta: { title: "Médicos" }
          }
        ]
      },
      {
        path: "exams",
        component: Exam,
        children: [
          {
            path: "/",
            component: ExamIndex,
            name: "exams",
            meta: { title: "Exames" }
          }
        ]
      },
      {
        path: "customers",
        component: Customer,
        children: [
          {
            path: "/",
            component: CustomerIndex,
            name: "customers",
            meta: { title: "Pacientes" }
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
