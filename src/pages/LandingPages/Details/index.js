import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import huellasImge from "assets/images/huellasPets.jpeg";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import API from "data";
import DefaultNavbar from "layouts/pages/shared/Navbars/DefaultNavbar";
import Contact from "pages/LandingPages/Details/Contact";
import PropTypes from "prop-types";
import { useAuth } from "providers/Auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { routesPrivate } from "routes";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CelebrationConfetti from "../RescuedPet";

function DetailsPage({ item, type }) {
  const autenticate = useAuth();
  const navigate = useNavigate();
  const [isRescued, setIsRescued] = useState(false);
  const images = item.photos?.map(
    (photo) => `${process.env.REACT_APP_API_HOST_URL}${photo.formats?.medium?.url || photo.url}`
  ) || ["path/to/default/image.jpg"];

  const [currentImage, setCurrentImage] = useState(0);
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    if (item && item.state === "Rescued") {
      setIsRescued(true);
    }
  }, [item]);

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => setCurrentImage(newIndex),
  };

  const handleSendEmail = async (data) => {
    console.log("Enviando correo con los datos:", data);
    alert("Correo enviado con éxito.");
  };

  const handleMarkAsRescued = async () => {
    try {
      const response = await API.put(
        item.name ? `/losts/${item.documentId}` : `/founds/${item.documentId}`,
        { data: { state: "Rescued" } }
      );
      if (response.status === 200 || response.status === 201) {
        setIsRescued(true);
      } else {
        alert("Error al actualizar el estado");
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("Error al actualizar el estado, intente nuevamente");
    }
  };

  const handleEdit = () => {
    return navigate(`/edit-lost/${item.documentId}`);
  };

  const isLost = type === "lost";

  return (
    <>
      <DefaultNavbar
        routes={routesPrivate}
        action={[
          {
            type: "internal",
            route: "/me-publishes",
            label: "Mis publicaciones",
            color: "primary",
          },
          {
            type: "internal",
            route: "/logout",
            label: "Cerrar Sesion",
            color: "info",
          },
        ]}
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
        }}
      >
        <Container sx={{ paddingTop: 10 }}>
          <MKBox px={1} width="100%" height="100vh" mx="auto" py={5} position="relative" zIndex={2}>
            <Card
              sx={{
                maxWidth: 900,
                margin: "auto",
                boxShadow: 5,
                borderRadius: "16px",
                backgroundColor: "white",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "16px 16px 0 0",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    zIndex: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    borderRadius: "12px",
                    padding: "4px 10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  <a style={{ color: "grey" }}>Desliza</a>{" "}
                  {`${currentImage + 1} / ${images.length}`}
                </Box>
                <Slider {...carouselSettings}>
                  {images.map((image, index) => (
                    <Box key={index} sx={{ width: "100%", height: "450px" }}>
                      <img
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </Slider>
              </Box>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {item.name || (isLost ? "Sin Nombre" : "Sin Identificación")}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Especie:</strong> {item.species || "No especificada"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Raza:</strong> {item.breed || "No especificada"}
                    </Typography>
                  </Grid>
                  {isLost && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Edad:</strong> {item.age || "Desconocida"}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Color:</strong> {item.color || "No especificado"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Ubicación:</strong>{" "}
                      {isLost ? item.last_seen_location : item.found_location || "No disponible"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Estado:</strong>{" "}
                      {item.state === (isLost ? "Lost" : "Found")
                        ? isLost
                          ? "Extraviado"
                          : "Encontrado"
                        : "Rescatado"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Fecha:</strong>{" "}
                      {new Date(
                        isLost ? item.date_reported : item.date_found
                      ).toLocaleDateString() || "Desconocida"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Descripción:</strong> {item.description || "Sin descripción"}
                    </Typography>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 3,
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  {autenticate.isAuthenticated && item.state !== "Rescued" && !isRescued && (
                    <>
                      <MKButton variant="contained" color="success" onClick={handleMarkAsRescued}>
                        Marcar como Rescatado
                      </MKButton>
                      <MKButton variant="gradient" color="info" onClick={handleEdit}>
                        Editar
                      </MKButton>
                    </>
                  )}
                  <MKButton
                    variant="gradient"
                    color="info"
                    component={Link}
                    to={item ? "/me-publishes" : `/${type}s`}
                  >
                    Volver a la lista
                  </MKButton>
                  {!autenticate.isAuthenticated && (
                    <MKButton
                      variant="contained"
                      color="success"
                      onClick={() => setContactModalOpen(true)}
                    >
                      Contactar
                    </MKButton>
                  )}
                </Box>
              </CardContent>
            </Card>
            <Contact
              open={isContactModalOpen}
              onClose={() => setContactModalOpen(false)}
              onSend={handleSendEmail}
            />
          </MKBox>
        </Container>
        {isRescued && <CelebrationConfetti isRescued={isRescued} />}
      </MKBox>
    </>
  );
}

DetailsPage.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    documentId: PropTypes.string,
    name: PropTypes.string,
    species: PropTypes.string,
    breed: PropTypes.string,
    age: PropTypes.number,
    color: PropTypes.string,
    description: PropTypes.string,
    last_seen_location: PropTypes.string,
    found_location: PropTypes.string,
    state: PropTypes.string,
    date_reported: PropTypes.string,
    date_found: PropTypes.string,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        formats: PropTypes.shape({
          medium: PropTypes.shape({
            url: PropTypes.string,
          }),
        }),
        url: PropTypes.string,
      })
    ),
  }).isRequired,
  type: PropTypes.oneOf(["lost", "found"]),
};

export default DetailsPage;
