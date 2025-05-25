/* 
   Main Application Routing File (App.jsx)
  --------------------------------------------------------
  This file sets up all the frontend routes using React Router.
  It controls which page should show based on the URL path.
  */

// React Router imports for defining app routes
import { Route, Routes } from "react-router-dom";

// Layouts for authentication and shopping sections
import AuthLayout from "./components/auth/layout";
import ShoppingLayout from "./components/shopping-view/layout";

// Auth-related pages
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";

// Shopping-related pages
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

// Common pages
import NotFound from "./pages/not-found"; // 404 page
import UnauthPage from "./pages/unauth-page"; // shown to unauthorized users

// Authentication check component (to protect private routes)
import CheckAuth from "./components/common/check-auth";

// Redux imports for state management
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Auth action to verify if the user is already logged in
import { checkAuth } from "./store/auth-slice";

// Loading skeleton UI while checking auth
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  // Accessing auth state from Redux store
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  // On app mount, check if the user is logged in using token/session
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // If the app is checking for auth, show a loading skeleton
  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  // Render the full app with routes after auth check is done
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>

        {/* Default Route - Landing or Redirect Route */}
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}></CheckAuth>
          }
        />

        {/* Auth Routes - Login and Register */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Shop Routes - All shopping features for logged-in users */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* If user is unauthorized to access a private route */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* Catch-All Route - 404 Page */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  );
}

export default App;
