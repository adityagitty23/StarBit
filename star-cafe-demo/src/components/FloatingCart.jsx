import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

export default function FloatingCart() {
  const {
    totalItems,
    totalPrice,
    setIsCartOpen,
  } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="
        fixed

        bottom-5
        left-1/2
        -translate-x-1/2

        lg:left-auto
        lg:right-8
        lg:translate-x-0

        z-40

        bg-[#FF7A1A]
        text-white

        px-5
        py-4

        rounded-3xl

        shadow-xl

        flex
        items-center
        gap-3

        transition-all
        duration-300

        hover:scale-105
      "
    >
      <div
        className="
          h-11
          w-11

          rounded-2xl

          bg-white/20

          flex
          items-center
          justify-center
        "
      >
        <ShoppingBag size={20} />
      </div>

      <div className="text-left">
        <p className="text-xs text-orange-100">
          Ready to Checkout
        </p>

        <p className="font-semibold">
          {totalItems} Items • ₹{totalPrice}
        </p>
      </div>
    </button>
  );
}