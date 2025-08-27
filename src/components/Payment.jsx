import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "./axios";
import { getBasketTotal } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      if (basket.length === 0) return;
      const response = await axios.post("/payments/create", {
        total: getBasketTotal(basket) * 100,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await setDoc(
        doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id),
        {
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      dispatch({ type: "EMPTY_BASKET" });
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      navigate("/orders", { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message);
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="bg-white min-h-screen p-2 sm:p-5">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <h1 className="text-center text-base sm:text-lg font-medium bg-gray-100 border-b border-gray-300 p-3 sm:p-4">
          Checkout (
          <Link to="/checkout" className="text-blue-600 hover:underline">
            {basket?.length} items
          </Link>
          )
        </h1>

        <div className="flex flex-col sm:flex-row p-3 sm:p-5 border-b border-gray-300 gap-2 sm:gap-5">
          <div className="flex-[0.2]">
            <h3 className="font-semibold text-sm sm:text-base">
              Delivery Address
            </h3>
          </div>
          <div className="flex-[0.8] text-sm sm:text-base">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Review Items */}
        <div className="flex flex-col sm:flex-row p-3 sm:p-5 border-b border-gray-300 gap-2 sm:gap-5">
          <div className="flex-[0.2]">
            <h3 className="font-semibold text-sm sm:text-base">
              Review items and delivery
            </h3>
          </div>
          <div className="flex-[0.8] space-y-3 sm:space-y-4">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="flex flex-col sm:flex-row p-3 sm:p-5 border-b border-gray-300 gap-2 sm:gap-5">
          <div className="flex-[0.2]">
            <h3 className="font-semibold text-sm sm:text-base">
              Payment Method
            </h3>
          </div>
          <div className="flex-[0.8]">
            <form
              onSubmit={handleSubmit}
              className="max-w-md flex flex-col gap-3"
            >
              <CardElement
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md text-sm sm:text-base"
              />

              <CurrencyFormat
                renderText={(value) => (
                  <h3 className="text-sm sm:text-lg font-semibold mt-2">
                    Order Total: {value}
                  </h3>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />

              <button
                disabled={processing || disabled || succeeded}
                className="mt-2 sm:mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <span>{processing ? <p>Processing…</p> : "Buy Now"}</span>
              </button>

              {error && (
                <div className="text-red-500 mt-1 text-sm">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
