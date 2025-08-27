import React from "react";
import { useStateValue } from "../context/StateProvider";

function Product({ id, title, image, price, rating }) {
  const [state, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className="flex flex-col items-center mx-2 sm:mx-3 p-4 sm:p-5 justify-end w-full z-10 max-h-[430px] min-w-[150px] sm:min-w-[100px] bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-2xl ">
      <div className="text-left sm:text-left">
        <p className="my-1 text-sm sm:text-base">{title}</p>
        <p className="py-1 text-sm sm:text-base">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="flex  sm:items-start">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>

      <img
        src={image}
        alt=""
        className="max-h-[150px] sm:max-h-[200px] w-full object-contain mb-4"
      />
      <button
        onClick={addToBasket}
        className="bg-[#f0c14b] rounded-sm mt-[20px] py-1 px-4 hover:bg-yellow-300 duration-300 text-sm sm:text-base"
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
