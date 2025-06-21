const routes = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Features",
    path: "/features",
    isComingSoon: true,
  },
  {
    id: 3,
    name: "Pricing",
    path: "/pricing",
    isComingSoon: true,
  },
  {
    id: 4,
    name: "About",
    path: "/about",
  },
  {
    id: 5,
    name: "Login",
    path: "/login",
  },
  {
    id: 6,
    name: "Register",
    path: "/register",
  },
];

export default routes;

export const comingSoonRoutes = routes.flatMap((route) =>
  route.isComingSoon ? route.path : []
);
