import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8181/",  // Your Keycloak server URL
  realm: "e-commerce-platform",
  clientId: "react-client"
});

export default keycloak;
