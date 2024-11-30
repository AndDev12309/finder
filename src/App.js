import { useEffect } from "react";

// react-router components
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// @mui material components
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Material Kit 2 React themes
import theme from "assets/theme";

// Material Kit 2 React routes
import LogoutPage from "layouts/pages/authentication/logout";
import SignInPage from "layouts/pages/authentication/sign-in";
import SignUpPage from "layouts/pages/authentication/sign-up";
import DetailPage from "layouts/pages/landing-pages/details";
import PublishPage from "layouts/pages/landing-pages/publish";
import PublsihesPage from "layouts/pages/landing-pages/publishes";
import PresentationPage from "layouts/pages/presentation";
import { AuthProvider } from "providers/Auth";
import routes from "routes";
import PublishhPage from "layouts/pages/landing-pages/publishh";
import ResetPasswordPage from "layouts/pages/landing-pages/ResetPassword";
import ForgotPasswordPage from "layouts/pages/landing-pages/ForgotPassword";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Routes>
          {getRoutes(routes)}
          <Route path="/pets" element={<PresentationPage />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/logout" element={<LogoutPage />} />

          <Route path="/pets" element={<PresentationPage />} />
          <Route path="/lost/:id" element={<DetailPage action="lost" />} />
          <Route path="/found/:id" element={<DetailPage action="found" />} />
          <Route path="*" element={<Navigate to="/pets" />} />

          <Route path="/me-publishes" element={<PublsihesPage to="/pets" />} />
          <Route path="/edit-lost/:id" element={<PublishPage />} />
          <Route path="/edit-found/:id" element={<PublishhPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
