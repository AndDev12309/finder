import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "layouts/pages/shared/Navbars/DefaultNavbar";
import { routesPublic } from "routes";
import API from "data";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      await API.post("/auth/forgot-password", {
        email: email.trim(),
      });
      setMessage("Correo enviado exitosamente. Por favor revisa tu bandeja de entrada.");
    } catch (error) {
      setMessage("Hubo un error al enviar el correo. Inténtalo nuevamente.");
    }
  };

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
      />
      <MKBox
        px={1}
        width="100%"
        minHeight="100vh"
        mx="auto"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card>
              <MKBox p={3}>
                <MKTypography variant="h4" mb={2} textAlign="center">
                  Recuperar Contraseña
                </MKTypography>
                <MKBox mb={2}>
                  <MKInput
                    type="email"
                    label="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                  />
                </MKBox>
                <MKButton variant="gradient" color="info" fullWidth onClick={handleForgotPassword}>
                  Enviar Correo
                </MKButton>
                {message && (
                  <MKTypography variant="body2" mt={2} color="text" textAlign="center">
                    {message}
                  </MKTypography>
                )}
                <MKBox mt={3} textAlign="center">
                  <MKTypography variant="button" color="text">
                    Regresar al{" "}
                    <MKTypography
                      component={Link}
                      to="/sign-in"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Inicio de Sesión
                    </MKTypography>
                  </MKTypography>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
};

export default ForgotPassword;
