import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useStateValue } from "../context/StateProvider";
import Order from "./Order";

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="px-10 py-5">
      <h1 className="text-2xl font-bold mb-5">Your Orders</h1>

      <div className="space-y-5">
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          orders.map((order) => <Order key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}

export default Orders;
