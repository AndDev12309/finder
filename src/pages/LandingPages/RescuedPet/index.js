import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const CelebrationConfetti = ({ isRescued }) => {
  const [showConfetti, setShowConfetti] = useState(isRescued);

  useEffect(() => {
    if (isRescued) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isRescued]);

  return (
    <>
      {showConfetti && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={300}
          />
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}
          >
            <Typography variant="h4" color="success.main" sx={{ fontWeight: "bold" }}>
              ¡Felicidades!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Has rescatado a tu mascota.
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};
CelebrationConfetti.propTypes = {
  isRescued: PropTypes.bool.isRequired,
};

export default CelebrationConfetti;
