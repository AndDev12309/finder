import React from 'react';
import { Route } from 'react-router-dom';
import withAuth from '../hocs/withAuth';

/**
 * Utilizado para lás páginas que son protegidas,
 * este componente valida si existe una sesión activa.
 * @param Component
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
const PrivateRoute = ( {
  component: Component,
  ...rest
} ) => {

  const getComponent = ( props ) => {
    return <Component { ...props } />;
  };

  return <Route { ...rest } component={ getComponent } />;
};

export default withAuth( PrivateRoute );
