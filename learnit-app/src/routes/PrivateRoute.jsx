/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../signals';

const PrivateRoute = ({ children }) => {
  if (!isLoggedIn.value) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
