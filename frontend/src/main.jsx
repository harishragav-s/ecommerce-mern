/*
  main.jsx
  This is the main entry point of your React app.
  It Connects your React app to the root HTML element (typically `<div id="root"></div>`).
*/

import { createRoot } from "react-dom/client"; // React 18+ root API
import App from "./App.jsx"; // The main App component
import "./index.css"; // Global styles, Tailwind etc.
import { BrowserRouter } from "react-router-dom"; // Enables routing support
import { Provider } from "react-redux"; // Makes Redux store available globally
import store from "./store/store.js"; // The Redux store you created
import { Toaster } from "./components/ui/toaster.jsx"; // Toast notification UI

// Render the React app into the HTML root element
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />         {/* Main app component */}
      <Toaster />     {/* Toasts for alerts, notifications, etc. */}
    </Provider>
  </BrowserRouter>
);
