import { useState } from "react";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    skuCode: "",
    price: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found! User might not be authenticated.");
      setMessage("Authentication error. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          skuCode: product.skuCode,
          price: parseFloat(product.price).toFixed(2), // Ensures decimal format
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMessage("Product created successfully!");
      setProduct({ name: "", description: "", skuCode: "", price: "" });
    } catch (error) {
      console.error("Error creating product:", error);
      setMessage("Failed to create product.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Create Product</h2>
      {message && <p className={`text-center ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Product SKU Code</label>
          <input
            type="text"
            name="skuCode"
            value={product.skuCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            step="0.01" // Allows decimal input
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
