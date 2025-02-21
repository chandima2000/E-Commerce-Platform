import { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2'

const PlaceOrder = () => {
  const location = useLocation();
  const product = location.state?.product || {};

  const [order, setOrder] = useState({
    skuCode: product.skuCode || "",
    price: product.price || "",
    quantity: 1,
    userDetails: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in order.userDetails) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        userDetails: {
          ...prevOrder.userDetails,
          [name]: value,
        },
      }));
    } else {
      setOrder({ ...order, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found! User might not be authenticated.");
      setMessage("Authentication error. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:9000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skuCode: order.skuCode,
          price: parseFloat(order.price),
          quantity: parseInt(order.quantity),
          userDetails: {
            email: order.userDetails.email,
            firstName: order.userDetails.firstName,
            lastName: order.userDetails.lastName,
          },
        }),
      });

      if (!response.status == 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
              title: 'Order placed successfully!',
              icon: 'success',
              showConfirmButton: false,
              timer: 2500
            })

      setMessage("Order placed successfully!");

    } catch (error) {

      console.error("Error placing order:", error);
      setMessage("Error placing order!");

      Swal.fire({
        title: 'Failed to place order!',
        icon: 'error',
        showConfirmButton: false,
        timer: 2500
      })

    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Place Order
      </h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product SKU Code</label>
          <input
            type="text"
            name="skuCode"
            value={order.skuCode}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={order.price}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={order.userDetails.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={order.userDetails.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={order.userDetails.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800 text-white py-2 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default PlaceOrder;
