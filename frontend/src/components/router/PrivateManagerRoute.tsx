import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import React from 'react';
import { UserTypes } from '../../models/userTypes';

const PrivateManagerRoute : React.FC<{allowedRoles: UserTypes[]}> = ({allowedRoles}) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("private route" , auth);
  return auth?.role && allowedRoles.find((x) => x === auth.role)    ? <Outlet /> : <Navigate to="/login/manager" state={{ from: location }} replace /> ;
};

export default PrivateManagerRoute;