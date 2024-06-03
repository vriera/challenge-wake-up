import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateStaffRoute :  React.FC<{Component: React.ComponentType}>  = ({ Component }) => {
 
const [isAuthenticated, setIsAuthenticated] = useState(false);

 // Your authentication logic goes here...
 
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateStaffRoute;