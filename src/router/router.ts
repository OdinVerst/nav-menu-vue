import {
  createRouter,
  createWebHistory,
} from "vue-router";
import HomePage from "../pages/HomePage.vue";
import DynamicPage from "../pages/DynamicPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/:pageSlug(.*)",
    name: "DynamicPage",
    component: DynamicPage,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
