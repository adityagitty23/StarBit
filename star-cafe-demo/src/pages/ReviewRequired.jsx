import { useNavigate } from "react-router-dom";

export default function ReviewRequired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex justify-center">
      <div
        className="
          w-full
          max-w-[768px]
          px-4
          py-6
        "
      >
        {/* Header */}

        <div className="text-center mb-6">

          <div className="text-6xl mb-3">
            ⚠️
          </div>

          <h1 className="text-3xl font-bold">
            Review Required
          </h1>

          <p className="text-gray-500 mt-2">
            Restaurant has suggested a change
            to your order.
          </p>

        </div>

        {/* Order Card */}

        <div
          className="
            bg-white
            rounded-[28px]
            p-5
            shadow-sm
            mb-5
          "
        >
          <p className="text-sm text-gray-500">
            Order ID
          </p>

          <h2 className="font-bold text-xl">
            SB12345
          </h2>
        </div>

        {/* Issue */}

        <div
          className="
            bg-white
            rounded-[28px]
            p-5
            shadow-sm
            mb-5
          "
        >
          <h2 className="font-semibold mb-4">
            Restaurant Update
          </h2>

          <div
            className="
              bg-orange-50
              border
              border-orange-100
              rounded-2xl
              p-4
            "
          >
            <p className="font-medium">
              Veg Pizza unavailable today.
            </p>

            <p className="text-gray-600 mt-2">
              Suggested Replacement:
            </p>

            <p className="font-semibold text-[#FF7A1A]">
              Margherita Pizza
            </p>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">
              Message from Restaurant
            </p>

            <p className="mt-2">
              Sorry, Veg Pizza is unavailable.
              We can prepare a Margherita Pizza
              instead at the same price.
            </p>
          </div>
        </div>

        {/* Price Impact */}

        <div
          className="
            bg-white
            rounded-[28px]
            p-5
            shadow-sm
            mb-5
          "
        >
          <div className="flex justify-between">

            <span>Current Total</span>

            <span>₹299</span>

          </div>

          <div className="flex justify-between mt-3">

            <span>New Total</span>

            <span className="font-semibold text-[#FF7A1A]">
              ₹299
            </span>

          </div>
        </div>

        {/* Actions */}

        <div className="space-y-3">

          <button
            onClick={() =>
              navigate("/payment")
            }
            className="
              w-full
              bg-[#FF7A1A]
              text-white
              py-4
              rounded-2xl
              font-semibold
            "
          >
            Accept Changes
          </button>

          <button
            onClick={() =>
              navigate("/home")
            }
            className="
              w-full
              bg-white
              text-red-500
              border
              border-red-200
              py-4
              rounded-2xl
              font-semibold
            "
          >
            Cancel Order
          </button>

        </div>
      </div>
    </div>
  );
}