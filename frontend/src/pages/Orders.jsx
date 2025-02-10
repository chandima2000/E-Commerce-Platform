// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";

// const Orders = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const product = location.state?.product; // Get the product from navigation state
//   const [quantity, setQuantity] = useState(1);

//   if (!product) {
//     return <div className="text-center text-red-600 text-lg mt-10">No product selected. Go back and choose a product.</div>;
//   }

//   const handlePlaceOrder = () => {
//     const orderData = {
//       productId: product.id,
//       skuCode: product.name,
//       totalPrice: product.price * quantity,
//       quantity,
      
//     };

//     console.log("Order Placed:", orderData);
    
//     // Redirect to success page
//     navigate("/orders-success", { state: { orderData } });
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Place Your Order</h2>
//       <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
//         <p className="text-gray-600 mt-2">{product.description}</p>
//         <span className="text-lg font-bold text-green-600 block mt-2">${product.price}</span>

//         <div className="mt-4">
//           <label className="block text-gray-700 font-medium">Quantity:</label>
//           <input
//             type="number"
//             min="1"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             className="w-full border border-gray-300 rounded-lg p-2 mt-2"
//           />
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           className="w-full mt-4 bg-green-600 hover:bg-green-800 text-white py-2 rounded-lg transition"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Orders;


import { useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2'

const Orders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; // Get selected product
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return <div className="text-center text-red-600 text-lg mt-10">No product selected. Go back and choose a product.</div>;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");

    const orderData = {
      skuCode: product.name,  
      price: product.price * product.quantity,
      quantity: quantity,
    };

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("User not authenticated. No access token found.");
      }

      const response = await fetch("http://localhost:9000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {

        Swal.fire({
          title: 'Failed to place order!',
          icon: 'error',
          showConfirmButton: false,
          timer: 2500
        })

        throw new Error(`Failed to place order: ${response.statusText}`);
      }

      const result = await response.text();

      console.log("Order placed successfully:", result);

      Swal.fire({
        title: 'Order placed successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      
      // Redirect to success page
     navigate("/products");

    } catch (error) {
      console.error("Error placing order:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Place Your Order</h2>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <span className="text-lg font-bold text-green-600 block mt-2">${product.price}</span>

        <div className="mt-4">
          <label className="block text-gray-700 font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 mt-2"
          />
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-4 bg-green-600 hover:bg-green-800 text-white py-2 rounded-lg transition"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Orders;
