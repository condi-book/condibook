import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { CookiesProvider } from "react-cookie";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <React.StrictMode>
  <CookiesProvider>
    <App />
  </CookiesProvider>,

  // </React.StrictMode>,
);
