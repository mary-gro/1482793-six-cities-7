import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

function PrivateRoute({render, path, exact, isAuth, redirect}) {

  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => (
        isAuth
          ? render(routeProps)
          : <Redirect to={redirect} />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
};

export default PrivateRoute;
