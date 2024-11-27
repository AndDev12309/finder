import Box from "@mui/material/Box";
import RotatingCard from "layouts/hared/Cards/RotatingCard";
import RotatingCardBack from "layouts/hared/Cards/RotatingCard/RotatingCardBack";
import RotatingCardFront from "layouts/hared/Cards/RotatingCard/RotatingCardFront";
import PropTypes from "prop-types";

export default function Header({ frontImage, title, description, borderColor, label, ruta }) {
  return (
    <Box
      sx={{
        border: `2px solid ${borderColor || "#000"}`,
        borderRadius: "8px",
        textAlign: "center",
        padding: "16px",
        maxWidth: "400px",
        margin: "16px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <RotatingCard>
        <RotatingCardFront
          image={frontImage}
          icon="pets"
          title={title}
          description={description}
          colorTitle="error"
        />
        <RotatingCardBack
          image={frontImage}
          title={title}
          description=""
          action={{
            type: "internal",
            route: ruta,
            label: label,
          }}
          colorTitle="success"
          buttonColor="error"
        />
      </RotatingCard>
    </Box>
  );
}

Header.propTypes = {
  ruta: PropTypes.string.isRequired, // Icon image URL
  frontImage: PropTypes.string.isRequired, // Icon image URL
  title: PropTypes.string.isRequired, // Title text
  description: PropTypes.string.isRequired, // Title text
  borderColor: PropTypes.string, // Optional border color
  label: PropTypes.string, // Optional button color
};

Header.defaultProps = {
  borderColor: "#000", // Default black border color
  label: "Ayuda", // Default green button color
};
