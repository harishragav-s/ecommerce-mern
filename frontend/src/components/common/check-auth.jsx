import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect unauthenticated users accessing root to login
  if (location.pathname === "/") {
    return isAuthenticated ? <Navigate to="/shop/home" /> : <Navigate to="/auth/login" />;
  }

  // Redirect unauthenticated users trying to access protected routes
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users away from login/register pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return <Navigate to="/shop/home" />;
  }

  // Allow access to valid routes
  return <>{children}</>;
}

export default CheckAuth;
