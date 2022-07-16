export const AUTHENTICATED_ROUTES = [
  {
    path: "/about",
    name: "About",
    meta: { authRequired: true },
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { authRequired: true },
    component: () => import("@/views/ProfileSetup.vue"),
  },
];
