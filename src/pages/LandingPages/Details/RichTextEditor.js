import { Delete, FormatBold, FormatItalic, FormatUnderlined, Image } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { convertToRaw, Editor, EditorState, Modifier, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import PropTypes from "prop-types";
import { useState } from "react";

function RichTextEditor({ onContentChange, onFilesChange }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleEditorChange = (state) => {
    setEditorState(state);
    const content = JSON.stringify(convertToRaw(state.getCurrentContent()));
    onContentChange(content);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const insertImage = (url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("IMAGE", "IMMUTABLE", { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newContentState = Modifier.insertText(
      contentState,
      editorState.getSelection(),
      " ",
      undefined,
      entityKey
    );
    const newEditorState = EditorState.push(editorState, newContentState, "apply-entity");
    setEditorState(newEditorState);
  };

  const handleFileChange = (event) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setSelectedFiles(files);
    onFilesChange(files);

    if (files.length > 0) {
      setIsUploading(true);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          insertImage(reader.result); // Insertar imagen en el editor
        };
        reader.readAsDataURL(file);
      });

      setTimeout(() => {
        setIsUploading(false);
      }, 2000);
    }
  };

  const handleFileRemove = (fileIndex) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== fileIndex);
    setSelectedFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, backgroundColor: "#fafafa" }}>
        <Box sx={{ display: "flex", gap: 1, mb: 1, borderBottom: "1px solid #ddd", pb: 1 }}>
          <Tooltip title="Negrita">
            <IconButton onClick={() => toggleInlineStyle("BOLD")}>
              <FormatBold />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cursiva">
            <IconButton onClick={() => toggleInlineStyle("ITALIC")}>
              <FormatItalic />
            </IconButton>
          </Tooltip>
          <Tooltip title="Subrayado">
            <IconButton onClick={() => toggleInlineStyle("UNDERLINE")}>
              <FormatUnderlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Insertar Imagen">
            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                multiple
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
              <IconButton component="span" color="primary">
                {isUploading ? <CircularProgress size={24} /> : <Image />}
              </IconButton>
            </label>
          </Tooltip>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            minHeight: 150,
            cursor: "text",
            p: 1,
            backgroundColor: "#ffffff",
            borderRadius: 1,
            "&:focus-within": {
              outline: "2px solid #3f51b5",
              outlineOffset: 2,
            },
          }}
        >
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            handleKeyCommand={handleKeyCommand}
            placeholder="Escribe tu mensaje aquí..."
          />
        </Box>

        {selectedFiles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {selectedFiles.map((file, index) => (
              <Alert
                key={index}
                severity="info"
                sx={{ mb: 1 }}
                action={
                  <Tooltip title="Eliminar archivo">
                    <IconButton
                      color="inherit"
                      size="small"
                      onClick={() => handleFileRemove(index)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Tooltip>
                }
              >
                <AlertTitle>Archivo adjunto</AlertTitle>
                {file.name}
              </Alert>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

RichTextEditor.propTypes = {
  onContentChange: PropTypes.func.isRequired,
  onFilesChange: PropTypes.func.isRequired,
};

export default RichTextEditor;
