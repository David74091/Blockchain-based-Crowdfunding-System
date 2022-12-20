import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FundraisingPlatformsProvider } from "./context/FundraisingPlatformContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FundraisingPlatformsProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </FundraisingPlatformsProvider>
);
