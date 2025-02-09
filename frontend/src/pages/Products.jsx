import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("access_token");

        if (!token) {
          console.error("No access token found! User might not be authenticated.");
          return;
        }

        const response = await fetch("http://localhost:9000/api/product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Attach JWT token
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

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} {product.description} ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
