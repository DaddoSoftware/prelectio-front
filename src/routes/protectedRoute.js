import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CODES } from "../consts/codes";

const useAuth = ({ redirectPath = "/", children, requiredRole }) => {
  const accessToken = localStorage.getItem("access_token");
  const infoToken = localStorage.getItem("user");

  const existAccessToken = !!accessToken;
  const existInfoToken = !!infoToken;

  let correcRole = false;

  if (requiredRole === "user") {
    if (existInfoToken) {
      correcRole = true;
    }
  }
  if (requiredRole === "admin") {
    if (existInfoToken) {
      let user = JSON.parse(infoToken);
      if (user.tipo_usuario === CODES.COD_ROLES_ADMIN) {
        correcRole = true;
      }
    }
  }
  if (requiredRole === "athlete") {
    if (existInfoToken) {
      let user = JSON.parse(infoToken);
      if (user.tipo_usuario === CODES.COD_ROLES_ATHLETE) {
        correcRole = true;
      }
    }
  }

  if (requiredRole === "recruiter") {
    if (existInfoToken) {
      let user = JSON.parse(infoToken);
      if (user.tipo_usuario === CODES.COD_ROLES_RECRUITER) {
        correcRole = true;
      }
    }
  }

  if (!existAccessToken || !existInfoToken || !correcRole) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return children ? children : <Outlet />;
  }
};

export default useAuth;
