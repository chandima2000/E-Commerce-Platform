import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          console.error("No access token found! User might not be authenticated.");
          return;
        }

        const response = await fetch("http://localhost:9000/api/product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle "Buy Now" click
  const handleBuyNow = (product) => {
    navigate("/orders", { state: { product } }); // Redirect to Orders page with selected product
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-105 duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <p className="text-gray-600 mt-4">{product.skuCode}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
