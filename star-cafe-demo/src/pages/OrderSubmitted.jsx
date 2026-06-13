import { useNavigate } from "react-router-dom";

export default function OrderSubmitted() {
  const navigate = useNavigate();

  const orderId =
  localStorage.getItem(
    "currentOrderId"
  );
  
  const orderType =
  localStorage.getItem(
    "currentOrderType"
  ) || "pickup";

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
        {/* Icon */}

        <div className="text-6xl mb-4">
          ⏳
        </div>

        {/* Title */}

        <h1 className="text-2xl font-bold text-gray-900">
          Order Submitted
        </h1>

        <p className="text-gray-500 mt-3">
          Restaurant is reviewing your order.
        </p>

        {/* Order ID */}

        <div
          className="
            mt-6
            bg-orange-50
            border
            border-orange-100
            rounded-2xl
            p-4
          "
        >
          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <p className="font-bold text-xl text-[#FF7A1A]">
          {orderId}
        </p>
        </div>

        {/* Status */}

        <div
          className="
            mt-4
            inline-flex
            items-center
            gap-2
            bg-orange-100
            text-[#FF7A1A]
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
          "
        >
          Reviewing Order
        </div>

        {/* Info */}

        <div className="mt-6 text-left">
          <div className="flex justify-between py-2">
            <span className="text-gray-500">
              Estimated Review Time
            </span>

            <span className="font-medium">
              1-2 Minutes
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-500">
              Order Type
            </span>

          <span className="font-medium capitalize">
            {orderType}
          </span>
          </div>
        </div>

        {/* Button */}

        <button
          onClick={() =>
            navigate("/order-tracking")
          }
          className="
            w-full
            mt-8
            bg-[#FF7A1A]
            text-white
            py-4
            rounded-2xl
            font-semibold
            shadow-md
            hover:scale-[1.02]
            transition
          "
        >
          Track Order
        </button>
      </div>
    </div>
  );
}