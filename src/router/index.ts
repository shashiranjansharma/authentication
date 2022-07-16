import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { AUTHENTICATED_ROUTES } from "./authenticatedroutes";
import store from "@/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { authRequired: true },
    children: [...AUTHENTICATED_ROUTES],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      authRequired: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = await getCurrentUser();
  if (to.matched.some((record) => record.meta.authRequired && !isLoggedIn)) {
    next({ name: "Login" });
  } else if (
    isLoggedIn &&
    to.matched.some((record) => !record.meta.authRequired)
  ) {
    next({ name: "Home" });
  } else next();
});

export default router;
