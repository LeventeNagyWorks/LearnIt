/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../signals';
import LoadingScreen from '../components/LoadingScreen';

const PrivateRoute = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      isLoggedIn.value = true;
    }
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn.value) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default PrivateRoute;
