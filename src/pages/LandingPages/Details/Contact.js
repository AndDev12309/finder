import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import LoadingSpinner from "components/Loading/LoadingSpinner";
import PropTypes from "prop-types";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import RichTextEditor from "./RichTextEditor";

function Contact({ open, onClose, onSend }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, error },
  } = useForm({
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const [editorContent, setEditorContent] = useState("");
  const [files, setFiles] = useState([]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        message: editorContent,
        files: files,
      };
      await onSend(payload);
      reset();
      onClose();
    } catch (error) {
      console.error("Error al enviar el correo", error);
    } finally {
      console.error("Error al enviar el correo", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {isSubmitting && <LoadingSpinner />}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Enviar Correo
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: "El correo no es válido",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Correo electrónico"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="subject"
              control={control}
              rules={{
                required: "El asunto es obligatorio",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Asunto"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <RichTextEditor
              value={editorContent}
              onContentChange={(content) => setEditorContent(content)}
              onFilesChange={(selectedFiles) => setFiles(selectedFiles)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

Contact.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired, // Función para enviar el correo
};

export default Contact;
