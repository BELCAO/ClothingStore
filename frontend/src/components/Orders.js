import { useState } from "react";

const Orders = (prop) => {
  const [orders, setOrders] = useState([]);
  setOrders(prop.orders);
  return (
    <div
      className="content"
      style={{ height: 500, backgroundColor: "aliceblue" }}
    >
        
    </div>
  );
};
export default Orders;
