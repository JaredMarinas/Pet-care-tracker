import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PetsProvider } from "./PetsProvider.jsx";
import App from "./App.jsx";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PetsProvider>
      <App />
      </PetsProvider>
    </BrowserRouter>
  </StrictMode>
);