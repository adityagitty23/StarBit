import { useNavigate } from "react-router-dom";

export default function OrderCompleted() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex justify-center items-center px-4">
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
        {/* Success Icon */}

        <div
          className="
            h-24
            w-24

            mx-auto

            rounded-full

            bg-green-100

            flex
            items-center
            justify-center

            text-5xl
          "
        >
          🎉
        </div>

        {/* Title */}

        <h1
          className="
            text-3xl
            font-bold

            mt-6
          "
        >
          Order Confirmed
        </h1>

        <p
          className="
            text-gray-500

            mt-3
          "
        >
          Your order has been confirmed and
          sent to the kitchen.
        </p>

        {/* Order Details */}

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
          <div className="flex justify-between">
            <span className="text-gray-500">
              Order ID
            </span>

            <span className="font-semibold">
              SB12345
            </span>
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-gray-500">
              Status
            </span>

            <span className="text-[#FF7A1A] font-semibold">
              Preparing
            </span>
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-gray-500">
              Estimated Time
            </span>

            <span className="font-semibold">
              15-20 mins
            </span>
          </div>
        </div>

        {/* Buttons */}

        <button
          onClick={() =>
            navigate("/order-tracking")
          }
          className="
            w-full

            mt-6

            bg-[#FF7A1A]
            text-white

            py-4

            rounded-2xl

            font-semibold

            shadow-lg
          "
        >
          Track Order
        </button>

        <button
          onClick={() =>
            navigate("/home")
          }
          className="
            w-full

            mt-3

            bg-white

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