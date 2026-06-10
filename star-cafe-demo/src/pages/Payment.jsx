import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] =
    useState("cash");

  const totalAmount = 299;

  const handleContinue = () => {
    navigate("/order-tracking");
  };

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

        <h1 className="text-3xl font-bold">
          Payment
        </h1>

        <p className="text-gray-500 mt-2">
          Choose your payment method
        </p>

        {/* Order Summary */}

        <div
          className="
            mt-6
            bg-white
            rounded-[28px]
            p-5
            shadow-sm
          "
        >
          <div className="flex justify-between">
            <span>Order ID</span>

            <span className="font-semibold">
              SB12345
            </span>
          </div>

          <div className="flex justify-between mt-4">
            <span>Total Amount</span>

            <span
              className="
                text-[#FF7A1A]
                font-bold
                text-xl
              "
            >
              ₹{totalAmount}
            </span>
          </div>
        </div>

        {/* Payment Options */}

        <div
          className="
            mt-5
            bg-white
            rounded-[28px]
            p-5
            shadow-sm
          "
        >
          <h2 className="font-semibold mb-4">
            Payment Method
          </h2>

          {/* Cash */}

          <label
            className="
              flex
              items-center
              gap-3

              border
              rounded-2xl
              p-4

              cursor-pointer
            "
          >
            <input
              type="radio"
              checked={
                paymentMethod === "cash"
              }
              onChange={() =>
                setPaymentMethod("cash")
              }
            />

            <div>
              <p className="font-medium">
                Cash
              </p>

              <p className="text-sm text-gray-500">
                Pay at counter / delivery
              </p>
            </div>
          </label>

          {/* UPI */}

          <label
            className="
              flex
              items-center
              gap-3

              border
              rounded-2xl
              p-4

              mt-3

              cursor-pointer
            "
          >
            <input
              type="radio"
              checked={
                paymentMethod === "upi"
              }
              onChange={() =>
                setPaymentMethod("upi")
              }
            />

            <div>
              <p className="font-medium">
                UPI
              </p>

              <p className="text-sm text-gray-500">
                Pay online securely
              </p>
            </div>
          </label>
        </div>

        {/* Info */}

        <div
          className="
            mt-5
            bg-orange-50
            border
            border-orange-100
            rounded-[28px]
            p-4
          "
        >
          <p className="text-sm text-gray-700">
            Payment options are shown only
            after the restaurant accepts
            your order.
          </p>
        </div>

        {/* Continue */}

        <button
          onClick={handleContinue}
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
          Continue
        </button>
      </div>
    </div>
  );
}