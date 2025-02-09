import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/api/orders") // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>Product: {order.productName}, Status: {order.status}</li>
        ))}
      </ul>
    </div>
  );
}
