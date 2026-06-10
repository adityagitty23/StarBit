import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    totalPrice,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    orderType: "pickup",
    packaging: false,
    instructions: "",
  });

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!formData.mobile.trim()) {
      alert("Please enter mobile number");
      return;
    }

    navigate("/order-submitted");
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

        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
            mb-2
          "
        >
          Checkout
        </h1>

        <p className="text-gray-500 mb-6">
          Complete your order details
        </p>

        {/* Customer Information */}

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
            Customer Information
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              p-4
              mb-4
              outline-none
            "
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({
                ...formData,
                mobile: e.target.value,
              })
            }
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              p-4
              outline-none
            "
          />
        </div>

        {/* Order Type */}

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
            Order Type
          </h2>

          <div className="space-y-3">

            <label
              className="
                flex
                items-center
                gap-3
                border
                border-gray-200
                rounded-2xl
                p-4
                cursor-pointer
              "
            >
              <input
                type="radio"
                checked={
                  formData.orderType === "pickup"
                }
                onChange={() =>
                  setFormData({
                    ...formData,
                    orderType: "pickup",
                  })
                }
              />

              Pickup From Counter
            </label>

            <label
              className="
                flex
                items-center
                gap-3
                border
                border-gray-200
                rounded-2xl
                p-4
                cursor-pointer
              "
            >
              <input
                type="radio"
                checked={
                  formData.orderType === "delivery"
                }
                onChange={() =>
                  setFormData({
                    ...formData,
                    orderType: "delivery",
                  })
                }
              />

              Delivery
            </label>

          </div>
        </div>

        {/* Delivery Address */}

        {formData.orderType ===
          "delivery" && (
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
              Delivery Address
            </h2>

            <textarea
              rows="3"
              placeholder="Enter your address"
              className="
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                outline-none
                resize-none
              "
            />
          </div>
        )}

        {/* Packaging */}

        <div
          className="
            bg-white
            rounded-[28px]
            p-5
            shadow-sm
            mb-5
          "
        >
          <label className="flex items-center justify-between">

            <div>

              <p className="font-semibold">
                Pack My Order
              </p>

              <p className="text-sm text-gray-500">
                Suitable for takeaway
              </p>

            </div>

            <input
              type="checkbox"
              checked={formData.packaging}
              onChange={() =>
                setFormData({
                  ...formData,
                  packaging:
                    !formData.packaging,
                })
              }
            />

          </label>
        </div>

        {/* Instructions */}

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
            Special Instructions
          </h2>

          <textarea
            rows="3"
            placeholder="Less spicy, extra ketchup, no onions..."
            value={formData.instructions}
            onChange={(e) =>
              setFormData({
                ...formData,
                instructions:
                  e.target.value,
              })
            }
            className="
              w-full
              border
              border-gray-200
              rounded-2xl
              p-4
              outline-none
              resize-none
            "
          />
        </div>

        {/* Order Summary */}

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
            Order Summary
          </h2>

          <div className="space-y-3">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="
                  flex
                  justify-between
                "
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹
                  {item.price *
                    item.quantity}
                </span>
              </div>
            ))}

          </div>

          <div
            className="
              border-t
              mt-4
              pt-4
              flex
              justify-between
              font-bold
              text-lg
            "
          >
            <span>Total</span>

            <span className="text-[#FF7A1A]">
              ₹{totalPrice}
            </span>
          </div>
        </div>

        {/* Place Order */}

        <button
          onClick={handleSubmit}
          className="
            w-full
            bg-[#FF7A1A]
            text-white
            py-4
            rounded-2xl
            font-semibold
            shadow-lg
            hover:bg-[#ff8c3a]
            transition
          "
        >
          Place Order
        </button>
      </div>
    </div>
  );
}