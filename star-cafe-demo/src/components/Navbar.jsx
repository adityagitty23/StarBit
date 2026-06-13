import { Search, Phone } from "lucide-react";
import logo from "../assets/logo/starbit-logo.png";
import restaurantConfig from "../config/restaurantConfig";

export default function Navbar({
  searchTerm,
  setSearchTerm,
}) {
  const handleCall = () => {
window.location.href = `tel:${restaurantConfig.mobile}`;

};

  return (
    <header className="sticky top-4 z-30 mb-6">
      <div
        className="
          bg-white/70
          backdrop-blur-xl
          border
          border-white/50
          rounded-[28px]
          shadow-sm
          p-3
        "
      >
        <div className="flex items-center gap-3">

          {/* Logo */}

          <img
            src={logo}
            alt="StarBit"
            className="
              h-10
              w-auto
              object-contain

              md:h-12
            "
          />

          {/* Search */}

          <div className="flex-1 relative">

            <input
              type="text"
              placeholder="Search food..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="
                w-full
                bg-white
                rounded-2xl
                border
                border-gray-100
                py-3
                pl-4
                pr-10
                text-sm
                outline-none
              "
            />

            <Search
              size={18}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

          </div>

          {/* Call */}

          <button
            onClick={handleCall}
            className="
              h-12
              w-12
              rounded-2xl
              bg-[#FF7A1A]
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              transition-all
              duration-200
              hover:scale-105
            "
          >
            <Phone size={18} />
          </button>

        </div>
      </div>
    </header>
  );
}