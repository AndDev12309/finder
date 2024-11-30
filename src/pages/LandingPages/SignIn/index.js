import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Switch from "@mui/material/Switch";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

//   components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

//   example components
import SimpleFooter from "layouts/pages/shared/Footers/SimpleFooter";
import DefaultNavbar from "layouts/pages/shared/Navbars/DefaultNavbar";

// Images
import bgImage from "assets/images/bgLogin.jpg";
import LoadingSpinner from "components/Loading/LoadingSpinner";
import API from "data";
import withoutAuth from "hocs/withoutAuth";
import Cookies from "js-cookie";
import { useAuth } from "providers/Auth";
import { routesPublic } from "routes";

function SignInBasic() {
  const { setAuthenticated, setCurrentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");

    if (accessToken) {
      const provider = window.location.search.includes("id_token") ? "google" : "facebook";
      handleLoginWithToken(accessToken, provider);
    }
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "https://finder-api-production.up.railway.app/api/connect/google";
  };

  const handleFacebookLogin = () => {
    window.location.href = "https://finder-api-production.up.railway.app/api/connect/facebook";
  };

  const handleLoginWithToken = async (accessToken, provider) => {
    try {
      const callbackUrl = `/auth/${provider}/callback?access_token=${accessToken}`;
      const responseLogin = await API.get(callbackUrl);

      if (responseLogin.status === 200) {
        API.headers["Authorization"] = "Bearer " + responseLogin.data.jwt;
        try {
          const responseUser = await API.get("/users/me");
          if (responseUser.status === 200) {
            localStorage.setItem("login", JSON.stringify(true));
            Cookies.set("token", responseLogin.data.jwt, { expires: 1 });
            API.headers["Authorization"] = "Bearer " + responseLogin.data.jwt;
            setCurrentUser(responseLogin.data.user);
            setAuthenticated(true);
            setLoading(false);
            navigate("/pets");
          }
        } catch (error) {
          console.error("Error al obtener userInfo:", error);
        }
      }
    } catch (error) {
      console.error(`Error al autenticar con ${provider}:`, error);
    }
  };

  const login = async () => {
    if (username === "" || password === "") {
      return alert("Ingrese usaurio y contraseña");
    }

    try {
      const response = await API.post("/auth/local", {
        identifier: username.trim(),
        password: password.trim(),
      });
      localStorage.setItem("login", JSON.stringify(true));
      //localStorage.setItem('menu', JSON.stringify(response));
      Cookies.set("token", response.data.jwt, { expires: 1 });
      API.headers["Authorization"] = "Bearer " + response.data.jwt;
      setCurrentUser(response.data.user);
      setAuthenticated(true);
      setLoading(false);
      navigate("/pets");
    } catch (e) {
      setAuthenticated(false);
      if (e.status === 400) {
        return alert(
          e?.error?.name.includes("ValidationError")
            ? "Uusario o contraseña incorrectos"
            : "Por favor intente en unos minutos"
        );
      }
      alert("Por favor intente en unos minutos");
    }
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <>
      <DefaultNavbar
        routes={routesPublic}
        action={{
          type: "internal",
          route: "/sign-up",
          label: "Registrarse",
          color: "info",
        }}
        transparent
        light
      />
      {loading && <LoadingSpinner />}
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Iniciar Sesion
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon onClick={handleFacebookLogin} color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon onClick={handleGoogleLogin} color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email/Usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={login}>
                      Ingresar
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      No tienes una cuenta?{" "}
                      <MKTypography
                        component={Link}
                        to="/sign-up"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Registrate
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default withoutAuth(SignInBasic);
