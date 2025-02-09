import PropTypes from "prop-types";
import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();
  return keycloak.authenticated ? children : <div>Please log in to continue.</div>;
};

// ✅ Add PropTypes validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
