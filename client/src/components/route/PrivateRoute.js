import React, { Component } from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const temp = true;

  return temp ? children : <Navigate to="/404" replace={true} />;
};

export default PrivateRoute;
