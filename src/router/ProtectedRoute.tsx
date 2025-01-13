import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth.ts";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location])

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return <Outlet />
}
