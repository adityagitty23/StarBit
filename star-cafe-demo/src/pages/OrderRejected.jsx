import { useNavigate } from "react-router-dom";
import restaurantConfig
from "../config/restaurantConfig";

export default function OrderRejected() {

  const navigate =
    useNavigate();

  const orderId =
    localStorage.getItem(
      "currentOrderId"
    );

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center px-4">

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-[32px]
          p-6
          shadow-sm
          text-center
        "
      >

        <div className="text-6xl">
          ❌
        </div>

        <h1
          className="
            text-3xl
            font-bold
            mt-4
          "
        >
          Order Rejected
        </h1>

        <p
          className="
            text-gray-500
            mt-3
          "
        >
          Unfortunately the restaurant
          could not accept your order.
        </p>

        <div
          className="
            mt-6
            bg-red-50
            border
            border-red-100
            rounded-2xl
            p-4
          "
        >

          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p
            className="
              font-bold
              text-lg
              text-red-600
            "
          >
            {orderId}
          </p>

        </div>

        <a
          href={`tel:${restaurantConfig.mobile}`}
          className="
            block
            mt-6
            w-full
            bg-[#FF7A1A]
            text-white
            py-4
            rounded-2xl
            font-semibold
          "
        >
          Call Restaurant
        </a>

        <button
          onClick={() =>
            navigate("/home")
          }
          className="
            w-full
            mt-3
            border
            py-4
            rounded-2xl
            font-semibold
          "
        >
          Back To Menu
        </button>

      </div>

    </div>
  );
}