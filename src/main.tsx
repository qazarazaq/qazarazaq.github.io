import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PageNavigation } from "./navigation/PageNavigation";
import "./index.css";
import "./portfolio.css";
import "./travel.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PageNavigation><App /></PageNavigation>
  </React.StrictMode>
);
