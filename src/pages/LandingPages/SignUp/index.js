import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

// Material Kit 2 React example components
import SimpleFooter from "layouts/pages/shared/Footers/SimpleFooter";
import DefaultNavbar from "layouts/pages/shared/Navbars/DefaultNavbar";

// Images
import bgImage from "assets/images/bgLogin.jpg";
import API from "data";
import withoutAuth from "hocs/withoutAuth";
import Cookies from "js-cookie";
import { useAuth } from "providers/Auth";
import { routesPublic } from "routes";

function SignUpBasic() {
  const { setAuthenticated, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  // Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, email, password } = data;

    try {
      const response = await API.post("/auth/local/register", {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        localStorage.setItem("login", JSON.stringify(true));
        Cookies.set("token", response.data.jwt, { expires: 1 });
        API.headers["Authorization"] = "Bearer " + response.data.jwt;
        setCurrentUser(response.data.user);
        setAuthenticated(true);
        navigate("/pets");
      }
    } catch (e) {
      setAuthenticated(false);
      if (e.status === 400) {
        return alert(
          e?.error?.name.includes("ApplicationError")
            ? "Usuario o email ya existen"
            : "Por favor intente en unos minutos"
        );
      }
      alert("Por favor intente en unos minutos");
    }
  };

  return (
    <>
      <DefaultNavbar
        routes={routesPublic}
        action={{
          type: "internal",
          route: "/sign-in",
          label: "Iniciar Sesion",
          color: "info",
        }}
        transparent
        light
      />
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
                  Registrarse
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Username"
                      {...register("username", {
                        required: "El nombre de usuario es obligatorio.",
                        minLength: { value: 3, message: "Mínimo 3 caracteres." },
                        maxLength: { value: 20, message: "Máximo 20 caracteres." },
                      })}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="email"
                      label="Email"
                      {...register("email", {
                        required: "El correo electrónico es obligatorio.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Formato de correo no válido.",
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Telefono"
                      {...register("phone")}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Password"
                      {...register("password", {
                        required: "La contraseña es obligatoria.",
                        minLength: { value: 8, message: "Debe tener al menos 8 caracteres." },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                          message: "Debe incluir letras y números.",
                        },
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      type="password"
                      label="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Debes confirmar tu contraseña.",
                        validate: (value, data) =>
                          value === data.password || "Las contraseñas no coinciden.",
                      })}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      color="info"
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Procesando..." : "Registrarme"}
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Ya tienes una cuenta?{" "}
                      <MKTypography
                        component={Link}
                        to="/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Ingresar
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

export default withoutAuth(SignUpBasic);
