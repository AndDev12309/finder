import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import SignUpBasic from "pages/LandingPages/SignUp";
import theme from "assets/theme";
import "@testing-library/jest-dom";

beforeEach(() => {
  global.fetch = jest.fn();
  global.alert = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      <Router>{component}</Router>
    </ThemeProvider>
  );
};

describe("Test componente de registro", () => {
  it("REGISTRO DE USUARIO testuser", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { user: { id: 1, username: "testuser" } },
      }),
    });

    renderWithTheme(<SignUpBasic />);

    fireEvent.change(screen.getByRole("textbox", { name: /username/i }), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input[name="password"]' }), {
      target: { value: "Password123" },
    });
    fireEvent.change(
      screen.getByLabelText(/confirm password/i, { selector: 'input[name="confirmPassword"]' }),
      { target: { value: "Password123" } }
    );

    fireEvent.click(screen.getByRole("button", { name: /registrarme/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_HOST}/auth/local/register`,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            username: "testuser",
            email: "test@example.com",
            phone: "",
            password: "Password123",
          }),
        })
      );
    });

    expect(global.alert).toHaveBeenCalledWith(
      "¡Correo de confirmación enviado! Por favor, revisa tu bandeja de entrada para verificar tu cuenta."
    );
  });

  it("REGISTRO DE USUARIO FALLIDO CON RESPUESTA DE LA API", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        error: { name: "ApplicationError" },
      }),
    });

    renderWithTheme(<SignUpBasic />);

    fireEvent.change(screen.getByRole("textbox", { name: /username/i }), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input[name="password"]' }), {
      target: { value: "Password123" },
    });
    fireEvent.change(
      screen.getByLabelText(/confirm password/i, { selector: 'input[name="confirmPassword"]' }),
      { target: { value: "Password123" } }
    );

    fireEvent.click(screen.getByRole("button", { name: /registrarme/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith("Usuario o email ya existen");
    });
  });
});
