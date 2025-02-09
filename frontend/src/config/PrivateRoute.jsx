import PropTypes from "prop-types";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    if (keycloak.authenticated) {
      // Store the token in localStorage when user logs in
      localStorage.setItem("access_token", keycloak.token);
    } else {
      // Remove token if user logs out
      localStorage.removeItem("access_token");
    }
  }, [keycloak.authenticated, keycloak.token]);

  return keycloak.authenticated ? children : <div>Please log in to continue.</div>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
