import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { fetchMe } from "@/store/auth/authSlice";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
/* ------------------------------------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------------------------------------ */

const ProtectedRoute = () => {
  const user = useAppSelector((state) => state?.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.user && user.accessToken) {
      dispatch(fetchMe());
    }
  }, [dispatch, user.accessToken, user.user]);

  if (user.status === "loading") {
    return <p>Loading...</p>;
  }

  const isAuthenticated = Boolean(user.accessToken);
  /* ------------------------------------------------------------------------------------------------------------------------------ */
  /* ------------------------------------------------------------------------------------------------------------------------------ */

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
