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

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import Information from "pages/Presentation/sections/Information";
import Informationn from "pages/Presentation/sections/Informationn";
import Informationnn from "pages/Presentation/sections/Informationnn";
import Testimonials from "pages/Presentation/sections/Testimonials";

// Presentation page components

// Routes
import footerRoutes from "footer.routes";

// Images
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import helpImg from "assets/images/helpFind.jpeg";
import huellasImge from "assets/images/huellasPets.jpeg";
import lostImge from "assets/images/lostPet.jpeg";

import { useFounds } from "data/useFounds";
import { useLosts } from "data/useLosts";
import { useEffect, useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "providers/Auth";
import { routesPublic } from "routes";
import Header from "./sections/Header";
import { routesPrivate } from "routes";

function Presentation() {
  const autenticate = useAuth();
  const [cardLosts, setCardLosts] = useState([]);
  const [cardFounds, setCardFounds] = useState([]);
  const [cardFoundRescueds, setCardFoundRescueds] = useState([]);
  const [cardLostRescueds, setCardostRescueds] = useState([]);
  const [searchLost, setSearchLost] = useState("");
  const [searchFound, setSearchFound] = useState("");
  const [searchRescued, setSearchRescued] = useState("");

  const [searchLostDelay, setSearchLostDelay] = useState(null);
  const [searchFoundDelay, setSearchFoundDelay] = useState(null);
  const [searchRescuedDelay, setSearchRescuedDelay] = useState(null);

  const [countFound, setCountFound] = useState(0);
  const [countLost, setCountLost] = useState(0);
  const [countRescued, setCountRescued] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const losts = useLosts({
    populate: { photos: true },
    filters: {
      state: "Lost",
      ...(searchLostDelay && {
        $or: [
          { name: { $containsi: searchLostDelay } },
          { species: { $containsi: searchLostDelay } },
          { breed: { $containsi: searchLostDelay } },
          { color: { $containsi: searchLostDelay } },
          { description: { $containsi: searchLostDelay } },
          { last_seen_location: { $containsi: searchLostDelay } },
        ],
      }),
    },
    sort: "date_reported:desc",
  });
  const founds = useFounds({
    populate: { photos: true },
    filters: {
      state: "Found",
      ...(searchFoundDelay && {
        $or: [
          { species: { $containsi: searchFoundDelay } },
          { breed: { $containsi: searchFoundDelay } },
          { color: { $containsi: searchFoundDelay } },
          { description: { $containsi: searchFoundDelay } },
          { found_location: { $containsi: searchFoundDelay } },
        ],
      }),
    },
    sort: "createdAt:desc",
  });

  const rescuedLosts = useLosts({
    populate: { photos: true },
    filters: {
      state: "Rescued",
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
    },
    sort: "date_reported:desc",
  });

  const rescuedFounds = useFounds({
    populate: { photos: true },
    filters: {
      state: "Rescued",
      ...(searchRescuedDelay && {
        $or: [
          { species: { $containsi: searchRescuedDelay } },
          { breed: { $containsi: searchRescuedDelay } },
          { color: { $containsi: searchRescuedDelay } },
          { description: { $containsi: searchRescuedDelay } },
          { found_location: { $containsi: searchRescuedDelay } },
        ],
      }),
    },
    sort: "createdAt:desc",
  });

  const delay = 1000;
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchLostDelay(searchLost);
      setSearchFoundDelay(searchFound);
      setSearchRescuedDelay(searchRescued);
    }, delay);
    console.log(searchRescuedDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchLost, searchFound, searchRescued]);

  useEffect(() => {
    if (losts.losts) {
      setCardLosts(losts.losts);
    }
    if (founds.founds) {
      setCardFounds(founds.founds);
    }
    if (rescuedLosts.losts) {
      setCardostRescueds(rescuedLosts.losts);
    }
    if (rescuedFounds.founds) {
      setCardFoundRescueds(rescuedFounds.founds);
    }
  }, [losts, founds, rescuedFounds, rescuedLosts]);

  useEffect(() => {
    if (
      isInitialLoad &&
      founds.founds &&
      losts.losts &&
      rescuedLosts.losts &&
      rescuedFounds.founds
    ) {
      setCountFound(founds.founds.length);
      setCountLost(losts.losts.length);
      setCountRescued(rescuedLosts.losts.length + rescuedFounds.founds.length);
      setIsInitialLoad(false);
    }
  }, [founds, losts, rescuedLosts, rescuedFounds, isInitialLoad]);

  return (
    <>
      {autenticate.isAuthenticated ? (
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
      ) : (
        <DefaultNavbar
          routes={routesPublic}
          action={{
            type: "internal",
            route: "/sign-in",
            label: "Iniciar Sesion",
            color: "info",
          }}
          sticky
        />
      )}
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${huellasImge})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6} justifyContent="center" mx="auto">
              <Header
                frontImage={lostImge}
                title="¿Perdiste a tu mascota?"
                description="No te rindas, cada publicación acerca más a tu mascota de vuelta a casa. ¡Haz que más personas puedan verla y ayudarte!"
                borderColor="#0000FF"
                buttonColor="#FF00FF"
                label="QUIERO AYUDA"
                ruta="/publish-lost"
              />
            </Grid>
            <Grid item xs={12} lg={6} justifyContent="center" mx="auto">
              <Header
                frontImage={helpImg}
                title="¿Encontraste una mascota?"
                description="Tu gesto puede marcar la diferencia. Publicar a esta mascota encontrada es el primer paso para reunirla con su familia."
                borderColor="#0000FF"
                buttonColor="#FF00FF"
                label="QUIERO AYUDAR"
                ruta="/publish-found"
              />
            </Grid>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Counters lost={countLost} found={countFound} rescued={countRescued} />
        <MKBox
          width="100%"
          sx={{
            placeItems: "center",
            display: "grid",
            pt: 3,
          }}
        >
          <Container>
            <Grid container item xs={12} lg={12} justifyContent="center" mx="auto">
              <MKTypography
                variant="h1"
                color="warning"
                mt={-4}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                ¡¡Mascotas Extraviadas!!
              </MKTypography>
              <TextField
                variant="outlined"
                label="Buscar Extraviadas"
                fullWidth
                margin="normal"
                onChange={(e) => setSearchLost(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {losts.isError && searchLostDelay && (
                        <ErrorIcon color="error" sx={{ fontSize: 25 }} />
                      )}
                      {!losts.isLoading && !searchLostDelay && (
                        <ErrorIcon color="info" sx={{ fontSize: 25 }} />
                      )}
                      {losts.isLoading && <CircularProgress size={25} />}
                      {!losts.isLoading && searchLostDelay && losts.losts && (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Container>
        </MKBox>
        <Information cardLosts={cardLosts} />
        <MKBox
          width="100%"
          sx={{
            placeItems: "center",
            pt: 3,
          }}
        >
          <Container>
            <Grid container item xs={12} lg={12} justifyContent="center" mx="auto">
              <MKTypography
                variant="h1"
                color="primary"
                mt={-4}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                ¡¡Busca Tu Mascota!!
              </MKTypography>
              <TextField
                variant="outlined"
                label="Buscar Encontradas"
                fullWidth
                margin="normal"
                onChange={(e) => setSearchFound(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {founds.isError && searchFoundDelay && (
                        <ErrorIcon color="error" sx={{ fontSize: 25 }} />
                      )}
                      {!founds.isLoading && !searchFoundDelay && (
                        <ErrorIcon color="info" sx={{ fontSize: 25 }} />
                      )}
                      {founds.isLoading && <CircularProgress size={25} />}
                      {!founds.isLoading && searchFoundDelay && founds.founds && (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Container>
        </MKBox>
        <Informationn cardFounds={cardFounds} />
        <MKBox
          width="100%"
          sx={{
            placeItems: "center",
            pt: 3,
          }}
        >
          <Container>
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
                ¡¡Mascotas Rescatadas!!
              </MKTypography>
              <TextField
                variant="outlined"
                label="Buscar Rescatadas"
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
        <Informationnn cardFounds={cardFoundRescueds} cardLosts={cardLostRescueds} />
        <Testimonials />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
