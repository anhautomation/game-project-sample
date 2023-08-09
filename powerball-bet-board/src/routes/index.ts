import { createRouter, createWebHistory } from "vue-router";

const Powerball = () => import("../pages/Powerball/Powerball.vue");

const routes = [
  {
    path: "/",
    name: "powerball",
    component: Powerball,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
