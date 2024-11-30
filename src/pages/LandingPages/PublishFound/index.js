import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Container, FormControl, Grid, TextField, Typography } from "@mui/material";
import huellasImge from "assets/images/huellasPets.jpeg";
import MKBox from "components/MKBox";
import API from "data";
import withAuth from "hocs/withAuth";
import DefaultNavbar from "layouts/pages/shared/Navbars/DefaultNavbar";
import PropTypes from "prop-types";
import { useAuth } from "providers/Auth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { routesPrivate } from "routes";

const FoundForm = ({ item }) => {
  const autenticate = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      species: item?.species || "",
      breed: item?.breed || "",
      color: item?.color || "",
      description: item?.description || "",
      found_location: item?.found_location || "",
      date_found: item?.date_found || "",
      photos: [],
    },
  });

  useEffect(() => {
    if (item?.photos) {
      setImagePreviews(
        item.photos.map(
          (photo) =>
            `${process.env.REACT_APP_API_HOST_URL}${photo.formats?.medium?.url || photo.url}`
        )
      );
    }
  }, [item]);

  const [imagePreviews, setImagePreviews] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    data.photos.forEach((photo) => {
      if (photo instanceof File) {
        formData.append("files", photo);
      }
    });

    try {
      // const uploadResponse = await API.post("/upload", formData);

      // const photoIds = uploadResponse.data.map((file) => file.id);

      let photoIds = item?.photos?.map((photo) => photo.id) || [];
      if (formData.has("files")) {
        const uploadResponse = await API.post("/upload", formData);
        photoIds = [...photoIds, ...uploadResponse.data.map((file) => file.id)];
      }
      const requestData = {
        data: {
          species: data.species,
          breed: data.breed,
          color: data.color,
          description: data.description,
          found_location: data.found_location,
          date_found: data.date_found,
          photos: photoIds,
          user: autenticate.currentUser.id,
        },
      };
      const response = item
        ? await API.put(`/founds/${item.documentId}`, requestData)
        : await API.post("/founds", requestData);

      // const response = await API.post("/founds", {
      //   data: {
      //     species: data.species,
      //     breed: data.breed,
      //     color: data.color,
      //     description: data.description,
      //     found_location: data.found_location,
      //     date_found: data.date_found,
      //     photos: photoIds,
      //     user: autenticate.currentUser.id,
      //     // publishedAt: null,
      //     // status: null,
      //   },
      // });
      if (response.status === 200 || response.status === 201) {
        return item ? navigate("/me-publishes") : navigate("/");
      }
    } catch (e) {
      alert("Por favor intente en unos minutos");
    }
  };

  const handleFileChange = async (e, field) => {
    const files = Array.from(e.target.files);
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const minWidth = 800; // Ancho mínimo en píxeles
    const minHeight = 800; // Alto mínimo en píxeles

    const validFiles = [];
    const errors = [];

    for (const file of files) {
      if (file.size > maxFileSize) {
        errors.push(`${file.name} es demasiado grande (máximo 5MB).`);
        continue;
      }

      // Validar resolución de imagen
      const imageResolution = await validateImageResolution(file, minWidth, minHeight);
      if (!imageResolution) {
        errors.push(
          `${file.name} no cumple con la resolución mínima de ${minWidth}x${minHeight} píxeles.`
        );
        continue;
      }

      validFiles.push(file);
    }

    if (errors.length > 0) {
      alert(errors.join("\n")); // Muestra los errores
    }

    setValue("photos", validFiles); // Solo archivos válidos
    field.onChange(validFiles); // Notifica al controlador

    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const validateImageResolution = (file, minWidth, minHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width >= minWidth && img.height >= minHeight) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.onerror = () => resolve(false);
    });
  };

  return (
    <>
      <DefaultNavbar
        routes={routesPrivate}
        action={{
          type: "internal",
          route: "/logout",
          label: "Cerrar Sesión",
          color: "info",
        }}
        sticky
      />
      <MKBox
        minHeight="25vh"
        width="100%"
        sx={{
          backgroundImage: `url(${huellasImge})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container sx={{ pt: 13 }}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              maxWidth: "700px",
              margin: "0 auto",
              padding: "30px",
              borderRadius: "16px",
              boxShadow: 5,
              backgroundColor: "#fefefe",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#5c67f2",
                mb: 3,
                textTransform: "uppercase",
              }}
            >
              Reportar Mascota Encontrada
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="species"
                  control={control}
                  rules={{ required: "La especie es obligatoria" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Especie"
                      fullWidth
                      error={!!errors.species}
                      helperText={errors.species?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="breed"
                  control={control}
                  render={({ field }) => <TextField {...field} label="Raza" fullWidth />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => <TextField {...field} label="Color" fullWidth />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="found_location"
                  control={control}
                  rules={{ required: "El lugar de hallazgo es obligatorio" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Lugar de hallazgo"
                      fullWidth
                      error={!!errors.found_location}
                      helperText={errors.found_location?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: "La descripción es obligatoria" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Descripción"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name="date_found"
                  control={control}
                  rules={{ required: "La fecha es obligatoria" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Fecha de hallazgo"
                      type="date"
                      fullWidth
                      error={!!errors.date_found}
                      helperText={errors.date_found?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="photos"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value.length > 0 || item || "Debes subir al menos una imagen",
                  }}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Typography variant="body1" gutterBottom>
                        Subir fotos (JPG, PNG)
                      </Typography>
                      <label htmlFor="photos">
                        <input
                          id="photos"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleFileChange(e, field)}
                          style={{ display: "none" }}
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          component="span"
                          startIcon={<PhotoCamera />}
                          sx={{
                            mt: 1,
                            color: "#ffffff",
                            "&:hover": {
                              backgroundImage: "linear-gradient(45deg, #7b809a 30%, #ffd091 90%)",
                            },
                          }}
                        >
                          Seleccionar Fotos
                        </Button>
                      </label>
                      {errors.photos && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                          {errors.photos.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    mt: 2,
                    justifyContent: "center",
                  }}
                >
                  {imagePreviews.map((src, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: 1,
                      }}
                    >
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "16px",
                  backgroundImage: "linear-gradient(45deg, #ff5f6d 30%, #ffc371 90%)",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundImage: "linear-gradient(45deg, #ff6a77 30%, #ffd091 90%)",
                  },
                }}
              >
                QUIERO AYUDAR
              </Button>
            </Box>
          </Box>
        </Container>
      </MKBox>
    </>
  );
};

FoundForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    documentId: PropTypes.string,
    species: PropTypes.string,
    breed: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
    found_location: PropTypes.string,
    state: PropTypes.string,
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

export default withAuth(FoundForm);
