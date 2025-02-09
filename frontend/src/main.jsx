//import { StrictMode } from "react";
//import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./config/keycloak"; 
import App from "./App";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
 
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactKeycloakProvider>

);