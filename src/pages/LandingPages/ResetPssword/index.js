import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "layouts/pages/shared/Navbars/DefaultNavbar";
import { routesPublic } from "routes";
import API from "data";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const code = searchParams.get("code");

    if (!code) {
      setMessage("El token de restablecimiento no es válido.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      await API.post("/auth/reset-password", {
        code,
        password,
        passwordConfirmation: confirmPassword,
      });
      setMessage("Contraseña restablecida exitosamente.");
      setTimeout(() => navigate("/sign-in"), 3000);
    } catch (error) {
      setMessage("Error al restablecer la contraseña. Inténtalo nuevamente.");
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
                  Restablecer Contraseña
                </MKTypography>
                <MKBox mb={2}>
                  <MKInput
                    type="password"
                    label="Nueva Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                </MKBox>
                <MKBox mb={2}>
                  <MKInput
                    type="password"
                    label="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                  />
                </MKBox>
                <MKButton variant="gradient" color="info" fullWidth onClick={handleResetPassword}>
                  Restablecer Contraseña
                </MKButton>
                {message && (
                  <MKTypography variant="body2" mt={2} color="text" textAlign="center">
                    {message}
                  </MKTypography>
                )}
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
};

export default ResetPassword;
