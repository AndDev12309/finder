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
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { routesPrivate } from "routes";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CelebrationConfetti from "../RescuedPet";

function DetailsPage({ item, type }) {
  const autenticate = useAuth();
  const navigate = useNavigate();
  const [isRescued, setIsRescued] = useState(false);
  const images = item.attributes.photos?.data?.map(
    (photo) =>
      `${process.env.REACT_APP_API_HOST_URL}${
        photo.attributes.formats?.medium?.url || photo.attributes.url
      }`
  ) || ["path/to/default/image.jpg"];

  const [currentImage, setCurrentImage] = useState(0);
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    if (item && item.attributes.state === "Rescued") {
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
    if (!item || !item.attributes.user || !item.attributes.user.data) {
      return;
    }
    if (!data.message) {
      alert("No se puede enviar un correo vació");
    }

    try {
      const formData = new FormData();
      formData.append("email", item.attributes.user.data.attributes.email);
      formData.append("replyTo", data.email);
      formData.append("subject", data.subject);
      formData.append("text", data.message?.text);
      formData.append("html", data.message?.html);

      if (data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await API.post("/email/send-email", formData);
      if (response.status === 200) {
        alert("Correo enviado exitosamente");
      } else {
        console.error("Error al enviar el correo");
      }
    } catch (error) {
      alert(error.response?.data?.error?.message || "Error al enviar el correo");
    }
  };

  const handleMarkAsRescued = async () => {
    try {
      const response = await API.put(
        item.attributes.name ? `/losts/${item.id}` : `/founds/${item.id}`,
        {
          data: { state: "Rescued" },
        }
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
    return navigate(`/edit-lost/${item.id}`);
  };

  const isLost = type === "lost";

  const volver = () => {
    navigate(-1);
  };

  return (
    <>
      {autenticate.isAuthenticated ? (
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
      ) : (
        <DefaultNavbar
          routes={routesPrivate}
          action={[
            {
              type: "internal",
              route: "/logout",
              label: "Cerrar Sesion",
              color: "info",
            },
          ]}
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
                ;
                <Box sx={{ padding: 2 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                      marginBottom: 2,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    {item.attributes.name || (isLost ? "Sin Nombre" : "Sin Identificación")}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "center", sm: "flex-start" },
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        textAlign: { xs: "center", sm: "left" },
                      }}
                    >
                      {isLost ? "Familiar: " : "Responsable: "}
                    </Typography>

                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        marginLeft: { sm: 2 },
                        textAlign: { xs: "center", sm: "left" },
                      }}
                    >
                      {item.attributes.user
                        ? ` ${item.attributes.user.data.attributes.username} / ${item.attributes.user.data.attributes.email}`
                        : " Sin Responsable"}
                    </Typography>
                  </Box>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Especie:</strong> {item.attributes.species || "No especificada"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Raza:</strong> {item.attributes.breed || "No especificada"}
                    </Typography>
                  </Grid>
                  {isLost && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <strong>Edad:</strong> {item.attributes.age || "Desconocida"}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Color:</strong> {item.attributes.color || "No especificado"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Ubicación:</strong>{" "}
                      {isLost
                        ? item.attributes.last_seen_location
                        : item.attributes.found_location || "No disponible"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Estado:</strong>{" "}
                      {item.attributes.state === (isLost ? "Lost" : "Found")
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
                        isLost ? item.attributes.date_reported : item.attributes.date_found
                      ).toLocaleDateString() || "Desconocida"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Descripción:</strong>{" "}
                      {item.attributes.description || "Sin descripción"}
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
                  {autenticate.isAuthenticated &&
                    item.attributes.state !== "Rescued" &&
                    !isRescued &&
                    item.attributes.user &&
                    item.attributes.user.data &&
                    autenticate.currentUser.id === item.attributes.user.data.id && (
                      <>
                        <MKButton variant="contained" color="success" onClick={handleMarkAsRescued}>
                          Marcar como Rescatado
                        </MKButton>
                        <MKButton variant="gradient" color="info" onClick={handleEdit}>
                          Editar
                        </MKButton>
                      </>
                    )}
                  <MKButton variant="gradient" color="info" onClick={volver}>
                    Volver a la lista
                  </MKButton>
                  {item.attributes.state !== "Rescued" &&
                    !isRescued &&
                    autenticate?.currentUser?.id !== item.attributes.user?.data?.id && (
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
    id: PropTypes.number.isRequired,
    attributes: PropTypes.shape({
      name: PropTypes.string,
      species: PropTypes.string,
      breed: PropTypes.string,
      color: PropTypes.string,
      age: PropTypes.number,
      description: PropTypes.string,
      last_seen_location: PropTypes.string,
      found_location: PropTypes.string,
      state: PropTypes.string,
      date_reported: PropTypes.string,
      date_found: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      publishedAt: PropTypes.string,
      photos: PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            attributes: PropTypes.shape({
              name: PropTypes.string,
              alternativeText: PropTypes.string,
              caption: PropTypes.string,
              width: PropTypes.number,
              height: PropTypes.number,
              formats: PropTypes.shape({
                small: PropTypes.shape({
                  ext: PropTypes.string,
                  url: PropTypes.string,
                  hash: PropTypes.string,
                  mime: PropTypes.string,
                  name: PropTypes.string,
                  path: PropTypes.string,
                  size: PropTypes.number,
                  width: PropTypes.number,
                  height: PropTypes.number,
                  sizeInBytes: PropTypes.number,
                }),
                medium: PropTypes.shape({
                  ext: PropTypes.string,
                  url: PropTypes.string,
                  hash: PropTypes.string,
                  mime: PropTypes.string,
                  name: PropTypes.string,
                  path: PropTypes.string,
                  size: PropTypes.number,
                  width: PropTypes.number,
                  height: PropTypes.number,
                  sizeInBytes: PropTypes.number,
                }),
                thumbnail: PropTypes.shape({
                  ext: PropTypes.string,
                  url: PropTypes.string,
                  hash: PropTypes.string,
                  mime: PropTypes.string,
                  name: PropTypes.string,
                  path: PropTypes.string,
                  size: PropTypes.number,
                  width: PropTypes.number,
                  height: PropTypes.number,
                  sizeInBytes: PropTypes.number,
                }),
              }),
              hash: PropTypes.string,
              ext: PropTypes.string,
              mime: PropTypes.string,
              size: PropTypes.number,
              url: PropTypes.string,
              previewUrl: PropTypes.string,
              provider: PropTypes.string,
              provider_metadata: PropTypes.object,
              createdAt: PropTypes.string,
              updatedAt: PropTypes.string,
            }).isRequired,
          }).isRequired
        ),
      }),
      user: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.number,
          attributes: PropTypes.shape({
            username: PropTypes.string,
            email: PropTypes.string,
          }),
        }),
      }),
    }).isRequired,
  }).isRequired,
  type: PropTypes.oneOf(["lost", "found"]).isRequired,
};

export default DetailsPage;
