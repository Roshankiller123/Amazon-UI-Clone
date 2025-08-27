import React from "react";
import { useStateValue } from "../context/StateProvider";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row my-5 sm:items-start">
      <img
        className="object-contain w-full sm:w-[180px] h-[180px] mx-auto"
        src={image}
        alt={title}
      />

      <div className="pl-0 sm:pl-5 mt-3 sm:mt-8 sm:text-left">
        <p className="text-sm sm:text-[17px] font-semibold">{title}</p>

        <p className="text-base sm:text-lg mt-1">
          <span className="text-xs sm:text-sm mr-1">$</span>
          <strong>{price}</strong>
        </p>

        <div className="flex sm:justify-start mt-1">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>

        {!hideButton && (
          <button
            onClick={removeFromBasket}
            className="mt-2 w-full bg-[#f0c14b] border border-[#a88734] border-t-[#9c7e31] border-b-[#846a29] text-[#111] px-3 py-1 rounded-sm text-sm sm:text-base"
          >
            Remove from Basket
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
