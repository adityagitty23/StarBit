import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FoodCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div
      className="
        bg-white
        rounded-[28px]
        overflow-hidden
        border
        border-gray-100
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* Image */}

      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="
            w-full
            h-36
            md:h-40
            object-cover
          "
        />

        {/* Rating */}

        <div
          className="
            absolute
            top-3
            right-3

            bg-white/90
            backdrop-blur-md

            px-2
            py-1

            rounded-full

            text-xs
            font-semibold

            shadow-sm
          "
        >
          ⭐ 4.8
        </div>
      </div>

      {/* Content */}

      <div className="p-4">

        <h3
          className="
            font-semibold
            text-gray-900
            text-sm
            md:text-base

            line-clamp-1
          "
        >
          {item.name}
        </h3>



        {/* Price + Add */}

        <div className="flex items-center justify-between mt-4">

          <div>
            <p
              className="
                text-base
                md:text-lg
                font-bold
                text-[#FF7A1A]
              "
            >
              ₹{item.price}
            </p>
          </div>

          <button
            onClick={() => addToCart(item)}
            className="
              h-10
              w-10

              rounded-2xl

              bg-[#FF7A1A]
              text-white

              flex
              items-center
              justify-center

              shadow-md

              transition-all
              duration-200

              hover:bg-[#ff8c3a]
              hover:scale-105
            "
          >
            <Plus size={18} />
          </button>

        </div>

      </div>
    </div>
  );
}