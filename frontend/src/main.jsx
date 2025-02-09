import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./config/keycloak"; 
import App from "./App";
import "./index.css";


// Token Refresh Logic
const onKeycloakTokens = (tokens) => {
  localStorage.setItem("access_token", tokens.token);
  localStorage.setItem("refresh_token", tokens.refreshToken);
};


ReactDOM.createRoot(document.getElementById("root")).render(
 
    <ReactKeycloakProvider authClient={keycloak} onTokens={onKeycloakTokens}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactKeycloakProvider>

);