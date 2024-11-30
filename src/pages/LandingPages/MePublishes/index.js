// @mui material components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React layouts/pages/shared
import DefaultFooter from "layouts/pages/shared/Footers/DefaultFooter";
import DefaultNavbar from "layouts/pages/shared/Navbars/DefaultNavbar";

// MePublishes page sections

// MePublishes page components

// Routes
import footerRoutes from "footer.routes";

// Images
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import huellasImge from "assets/images/huellasPets.jpeg";

import { useFounds } from "data/useFounds";
import { useLosts } from "data/useLosts";
import { useEffect, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "providers/Auth";
import { routesPrivate } from "routes";
import Publishes from "./Publishes";

function MePublishes() {
  const autenticate = useAuth();
  const [cardFoundRescueds, setCardFoundRescueds] = useState([]);
  const [cardLostRescueds, setCardostRescueds] = useState([]);
  const [searchRescued, setSearchRescued] = useState("");
  const [searchRescuedDelay, setSearchRescuedDelay] = useState(null);

  const rescuedLosts = useLosts({
    populate: { photos: true },
    filters: {
      ...(searchRescuedDelay && {
        $or: [
          { name: { $containsi: searchRescuedDelay } },
          { species: { $containsi: searchRescuedDelay } },
          { breed: { $containsi: searchRescuedDelay } },
          { color: { $containsi: searchRescuedDelay } },
          { description: { $containsi: searchRescuedDelay } },
          { last_seen_location: { $containsi: searchRescuedDelay } },
        ],
      }),
      user: autenticate.currentUser.id,
    },
    publicationState: "preview",
    sort: "date_reported:desc",
  });

  const rescuedFounds = useFounds({
    populate: { photos: true },
    filters: {
      ...(searchRescuedDelay && {
        $or: [
          { species: { $containsi: searchRescuedDelay } },
          { breed: { $containsi: searchRescuedDelay } },
          { color: { $containsi: searchRescuedDelay } },
          { description: { $containsi: searchRescuedDelay } },
          { found_location: { $containsi: searchRescuedDelay } },
        ],
      }),
      user: autenticate.currentUser.id,
    },
    publicationState: "preview",
    sort: "createdAt:desc",
  });

  const delay = 1000;
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchRescuedDelay(searchRescued);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchRescued]);

  useEffect(() => {
    if (rescuedLosts.losts) {
      setCardostRescueds(rescuedLosts.losts);
    }
    if (rescuedFounds.founds) {
      setCardFoundRescueds(rescuedFounds.founds);
    }
  }, [rescuedFounds, rescuedLosts]);

  return (
    <>
      <DefaultNavbar
        routes={routesPrivate}
        action={{
          type: "internal",
          route: "/logout",
          label: "Cerrar Sesion",
          color: "info",
        }}
        sticky
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${huellasImge})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
          pt: 10,
        }}
      >
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <MKBox
            width="100%"
            sx={{
              placeItems: "center",
              pt: 3,
            }}
          >
            <Container sx={{ pt: 5 }}>
              <Grid container item xs={12} lg={12} justifyContent="center" mx="auto">
                <MKTypography
                  variant="h1"
                  color="success"
                  mt={-4}
                  sx={({ breakpoints, typography: { size } }) => ({
                    [breakpoints.down("md")]: {
                      fontSize: size["3xl"],
                    },
                  })}
                >
                  ¡¡Mascotas Publicadas!!
                </MKTypography>
                <TextField
                  variant="outlined"
                  label="Buscar mascotas publicadas"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setSearchRescued(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {rescuedLosts.isError && rescuedFounds.isError && searchRescuedDelay && (
                          <ErrorIcon color="error" sx={{ fontSize: 25 }} />
                        )}
                        {!rescuedLosts.isLoading &&
                          !rescuedFounds.isLoading &&
                          !searchRescuedDelay && <ErrorIcon color="info" sx={{ fontSize: 25 }} />}
                        {rescuedLosts.isLoading && rescuedFounds.isLoading && (
                          <CircularProgress size={25} />
                        )}
                        {!rescuedLosts.isLoading &&
                          !rescuedFounds.isLoading &&
                          searchRescuedDelay &&
                          (rescuedLosts.founds || rescuedFounds.founds) && (
                            <CheckCircleIcon sx={{ color: "green" }} />
                          )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Container>
          </MKBox>
          <Publishes cardFounds={cardFoundRescueds} cardLosts={cardLostRescueds} />
        </Card>
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default MePublishes;
