import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import CreateProduct from "./pages/CreateProduct";
import PrivateRoute from "./config/PrivateRoute";
import Navbar from "./components/NavBar";


function App() {
  return (
  <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path="/create-product" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />
      </Routes>
      </div>
  );
}

export default App;
