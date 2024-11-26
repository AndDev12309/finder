import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Utilizado para las páginas que son accesibles por todos los usuarios.
 *
 * @param Component
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const PublicRoute = ( {
  component: Component,
  ...rest
} ) => {
  return <Route { ...rest } component={ ( props ) => <Component { ...props } /> } />;
};

export default PublicRoute;
