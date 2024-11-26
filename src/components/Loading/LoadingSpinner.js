const LoadingSpinner = () => {
  return (
    <div
      className="loading-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.2)", // Fondo semitransparente
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Centrado vertical
        zIndex: 9999,
      }}
    >
      <img
        src={require("assets/images/loading-gif-png-5.gif")}
        alt="Loading..."
        style={{
          width: "50px", // Tamaño más pequeño
          height: "50px", // Tamaño proporcional
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
