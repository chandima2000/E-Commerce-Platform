import { useKeycloak } from "@react-keycloak/web";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { keycloak } = useKeycloak();

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200 text-yellow-500">
          E-Store
        </Link>

        {/* Links */}
        <div className="flex space-x-6">
          {keycloak.authenticated ? (
            <>
              <Link to="/products" className="hover:text-gray-200">
                View Products
              </Link>
              <Link to="/orders" className="hover:text-gray-200">
                View Orders
              </Link>
              <Link to="/create-product" className="hover:text-gray-200">
                Create Product
              </Link>
              <button
                onClick={() => keycloak.logout()}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => keycloak.login()}
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
