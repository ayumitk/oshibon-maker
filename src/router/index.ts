import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Oshibon from "../views/Oshibon.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/oshibon/:id",
    name: "oshibon",
    component: Oshibon,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
