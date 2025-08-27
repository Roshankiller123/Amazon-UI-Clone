import React from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  if (!order || !order.data) return null;

  return (
    <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-md shadow-md max-w-full sm:max-w-3xl mx-auto">
      <h2 className="text-base sm:text-lg font-semibold mb-2">Order</h2>

      <p className="text-gray-600 text-xs sm:text-sm mb-1">
        {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
      </p>

      <p className=" sm:top-6 right-3 sm:right-5 text-xs sm:text-sm text-gray-500">
        <small>
          <strong>Order ID:</strong> {order.id}
        </small>
      </p>

      <div className="mt-3 sm:mt-4 space-y-3">
        {order.data.basket?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:gap-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full sm:w-32 object-contain mb-2 sm:mb-0"
            />

            <div className="flex flex-col sm:flex-1 text-xs sm:text-sm">
              <p className="font-semibold">{item.title}</p>
              <p>
                <small>$</small>
                <strong>{item.price}</strong>
              </p>
              <div className="flex">
                {Array(item.rating)
                  .fill()
                  .map((_, i) => (
                    <p key={i}>⭐</p>
                  ))}
              </div>
              <CurrencyFormat
                renderText={(value) => (
                  <p className="mt-1 sm:mt-2 font-semibold">Total: {value}</p>
                )}
                decimalScale={2}
                value={item.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
