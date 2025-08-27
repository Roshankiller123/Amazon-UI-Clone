import React from "react";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../context/StateProvider";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-5 bg-white max-h-max">
      {/* Left Side */}
      <div className="flex-1">
        <img
          src="https://www.shutterstock.com/image-vector/4th-july-america-independenc-day-260nw-2172870539.jpg"
          alt=""
          className="w-full mb-2"
        />

        <div>
          <h3 className="mr-3 pl-3 font-bold text-sm sm:text-base">
            Hello {!user ? "Guest" : user.email.split("@")[0]}
          </h3>
          <h2 className="mr-3 p-3 border-b-[1px] border-gray-400 font-bold text-lg sm:text-2xl">
            Your Shopping Basket
          </h2>

          {basket.map((item, i) => (
            <CheckoutProduct
              key={i}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-[500px] mt-4 lg:mt-0">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
