import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../context/StateProvider";
import { getBasketTotal } from "../context/reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="flex flex-col justify-between w-full sm:w-[500px] p-5 bg-[#f3f3f3] gap-4 border-[1px] border-[#dddddd] rounded-md">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className="text-sm sm:text-base">
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="flex items-center gap-1 text-xs sm:text-sm">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button
        onClick={() => navigate("/payment")}
        className="bg-[#f0c14b] border-[1px] border-yellow-600 rounded-sm mt-[20px] py-1 px-4 text-sm sm:text-base"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
