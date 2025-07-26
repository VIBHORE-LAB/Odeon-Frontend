import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem("spotify_access_token");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};
