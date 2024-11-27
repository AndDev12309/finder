import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Container, FormControl, Grid, TextField, Typography } from "@mui/material";
import huellasImge from "assets/images/huellasPets.jpeg";
import MKBox from "components/MKBox";
import DefaultNavbar from "layouts/hared/Navbars/DefaultNavbar";
import withAuth from "hocs/withAuth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { routesPrivate } from "routes";

const LostForm = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      species: "",
      breed: "",
      age: "",
      color: "",
      description: "",
      last_seen_location: "",
      date_reported: "",
      photos: [],
    },
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
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
          label: "Cerrar Sesion",
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
              Reportar Mascota Perdida
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "El nombre es obligatorio" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nombre de Mascota"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="species"
                  rules={{ required: "La especie es obligatorio" }}
                  control={control}
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
                  rules={{ required: "La raza es obligatorio" }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Raza"
                      fullWidth
                      error={!!errors.breed}
                      helperText={errors.breed?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="age"
                  rules={{ required: "La edad es obligatorio" }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Edad"
                      type="number"
                      fullWidth
                      error={!!errors.age}
                      helperText={errors.age?.message}
                      inputProps={{ min: 0 }}
                    />
                  )}
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
                  name="last_seen_location"
                  rules={{ required: "El lugar es obligatorio" }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Lugar de extravío"
                      fullWidth
                      error={!!errors.last_seen_location}
                      helperText={errors.last_seen_location?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="description"
                  rules={{ required: "Caraterísticas es obligatorio" }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Características"
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
                  name="date_reported"
                  control={control}
                  rules={{ required: "La fecha es obligatorio" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Fecha de perdida"
                      type="date"
                      fullWidth
                      error={!!errors.date_reported}
                      helperText={errors.date_reported?.message}
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
                    validate: (value) => value.length > 0 || "Debes subir al menos una imagen",
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
                  color: "#ffffff", // Cambia el color del texto aquí
                  "&:hover": {
                    backgroundImage: "linear-gradient(45deg, #ff6a77 30%, #ffd091 90%)",
                  },
                }}
              >
                Quiero Ayuda
              </Button>
            </Box>
          </Box>
        </Container>
      </MKBox>
    </>
  );
};

export default withAuth(LostForm);
