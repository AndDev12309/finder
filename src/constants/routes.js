const publicRoutes = {
  LOGIN: "/sign-in",
  REGISTER: "/sign-up",
  HOME: "/",
};

const privateRoutes = {
  LOGOUT: "/logout",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
