import { X, Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const isEmpty = cartItems.length === 0;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={() => setIsCartOpen(false)}
        className="
          fixed
          inset-0
          bg-black/40
          backdrop-blur-sm
          z-40
        "
      />

      {/* Drawer */}

      <div
        className="
          fixed
          bottom-0
          left-1/2
          -translate-x-1/2

          w-full
          max-w-[520px]

          bg-white

          rounded-t-[32px]

          shadow-2xl

          z-50

          p-5

          max-h-[85vh]
          overflow-y-auto
          scrollbar-premium
        "
      >
        {/* Header */}

        <div
          className="
            sticky
            top-0

            bg-white/80
            backdrop-blur-md

            flex
            items-center
            justify-between

            py-3

            mb-6

            z-10
          "
        >
          <h2 className="text-xl font-bold">
            Your Cart
          </h2>

          <button
            onClick={() =>
              setIsCartOpen(false)
            }
            className="
              h-9
              w-9

              rounded-full

              bg-gray-100

              flex
              items-center
              justify-center
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Empty Cart */}

        {isEmpty ? (
          <div className="py-12 text-center">

            <div className="text-6xl mb-4">
              🛒
            </div>

            <h3 className="font-semibold text-lg">
              Your cart is empty
            </h3>

            <p className="text-gray-500 mt-2">
              Add delicious food to begin
            </p>

          </div>
        ) : (
          <>
            {/* Items */}

            <div className="space-y-3">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="
                    bg-[#FFF9F4]

                    rounded-2xl

                    p-3

                    flex
                    items-center
                    justify-between
                  "
                >
                  <div className="flex gap-3">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        h-16
                        w-16

                        rounded-xl

                        object-cover
                      "
                    />

                    <div>

                      <h3 className="font-medium">
                        {item.name}
                      </h3>

                      <p
                        className="
                          text-[#FF7A1A]
                          font-semibold
                        "
                      >
                        ₹{item.price}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="
                        h-8
                        w-8

                        rounded-full

                        bg-white

                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Minus size={14} />
                    </button>

                    <span className="font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="
                        h-8
                        w-8

                        rounded-full

                        bg-[#FF7A1A]
                        text-white

                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Plus size={14} />
                    </button>

                  </div>
                </div>
              ))}

            </div>

            {/* Summary */}

            <div
              className="
                mt-6

                border-t

                pt-5
              "
            >
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ₹{totalPrice}
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between

                  text-lg
                  font-bold

                  mt-4
                "
              >
                <span>Total</span>

                <span className="text-[#FF7A1A]">
                  ₹{totalPrice}
                </span>
              </div>

              {/* Checkout */}

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout");
                }}
                className="
                  w-full

                  mt-5

                  bg-[#FF7A1A]
                  text-white

                  py-4

                  rounded-2xl

                  font-semibold

                  shadow-lg
                "
              >
                Review & Checkout →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}