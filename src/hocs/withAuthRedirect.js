import PropTypes from "prop-types";
import LoadingSpinner from "components/Loading/LoadingSpinner";
import { useAuth } from "providers/Auth";
import Routes from "constants/routes";
import { Navigate } from "react-router-dom";

export default function withAuthRedirect({
  WrappedComponent,
  LoadingComponent = LoadingSpinner,
  expectedAuth,
  location,
}) {
  const WithAuthRedirectWrapper = (props) => {
    const { isCheckingAuth, isAuthenticated } = useAuth();
    if (isCheckingAuth) {
      return <LoadingComponent />;
    }
    if (expectedAuth !== isAuthenticated) {
      return <Navigate to={location || Routes.LOGIN} state={{ from: props.location }} replace />;
    }
    return <WrappedComponent {...props} />;
  };
  WithAuthRedirectWrapper.propTypes = {
    location: PropTypes.object,
  };

  return WithAuthRedirectWrapper;
}

// Definimos propTypes para los argumentos de la función withAuthRedirect
withAuthRedirect.propTypes = {
  WrappedComponent: PropTypes.elementType.isRequired, // Componente que será envuelto
  LoadingComponent: PropTypes.elementType, // Componente para mostrar mientras se carga
  expectedAuth: PropTypes.bool.isRequired, // Define si se requiere autenticación
  location: PropTypes.string, // Ruta de redirección
};
