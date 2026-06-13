import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Store,
  Globe,
  Phone,
  Plus,
} from "lucide-react";

import api from "../../services/api";
import SuperAdminLayout from "../../components/superadmin/SuperAdminLayout";

export default function Restaurants() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchRestaurants =
      async () => {
        try {
          const res =
            await api.get(
              "/restaurants"
            );

          setRestaurants(
            res.data
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchRestaurants();
  }, []);

  return (
    <SuperAdminLayout>
      <div
        className="
          min-h-screen
          bg-gradient-to-br
          from-[#FFF7F0]
          via-[#FFF2E8]
          to-[#FFE6D1]
        "
      >
        {/* Hero */}

        <div
          className="
            bg-gradient-to-r
            from-[#FF7A1A]
            to-[#FF9A4D]
            rounded-3xl
            p-6 md:p-8
            text-white
            shadow-xl
            mb-8
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:justify-between
              md:items-center
              gap-5
            "
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                🍽️ Restaurants
              </h1>

              <p className="text-white/80 mt-2">
                Manage all restaurant clients
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/create-restaurant"
                )
              }
              className="
                bg-white
                text-[#FF7A1A]
                px-5
                py-3
                rounded-2xl
                font-semibold
                flex
                items-center
                gap-2
                shadow-lg
                hover:scale-105
                transition-all
                w-fit
              "
            >
              <Plus size={18} />
              Create Restaurant
            </button>
          </div>
        </div>

        {/* Stats */}

        <div
          className="
            bg-white/70
            backdrop-blur-xl
            border
            border-white/50
            rounded-3xl
            p-6
            shadow-lg
            mb-8
          "
        >
          <p className="text-gray-500">
            Total Restaurants
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {restaurants.length}
          </h2>
        </div>

        {/* Loading */}

        {loading ? (
          <div
            className="
              bg-white/70
              backdrop-blur-xl
              rounded-3xl
              p-10
              text-center
              shadow-lg
            "
          >
            Loading Restaurants...
          </div>
        ) : restaurants.length ===
          0 ? (
          <div
            className="
              bg-white/70
              backdrop-blur-xl
              rounded-3xl
              p-10
              text-center
              shadow-lg
            "
          >
            <div className="text-6xl mb-4">
              🍽️
            </div>

            <h2 className="text-2xl font-bold">
              No Restaurants Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first
              restaurant.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >
            {restaurants.map(
              (restaurant) => (
                <div
                  key={restaurant.id}
                  className="
                    bg-white/70
                    backdrop-blur-xl
                    border
                    border-white/50
                    rounded-3xl
                    p-6
                    shadow-lg
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                  "
                >
                  {/* Top */}

                  <div className="flex justify-between items-start">
                    <div
                      className="
                        h-14
                        w-14
                        rounded-2xl
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Store
                        size={24}
                        className="text-[#FF7A1A]"
                      />
                    </div>

                    <span
                      className={`
                        px-3
                        py-1
                        rounded-2xl
                        text-xs
                        font-semibold

                        ${
                          restaurant.status ===
                          "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {
                        restaurant.status
                      }
                    </span>
                  </div>

                  {/* Details */}

                  <h2
                    className="
                      text-xl
                      font-bold
                      mt-5
                    "
                  >
                    {
                      restaurant.restaurantName
                    }
                  </h2>

                  <p
                    className="
                      text-gray-500
                      text-sm
                      mt-1
                    "
                  >
                    {restaurant.id}
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />

                      <span>
                        {
                          restaurant.mobile
                        }
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Globe size={16} />

                      <span className="truncate">
                        {
                          restaurant.websiteUrl
                        }
                      </span>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="mt-6">
                    <button
                      onClick={() =>
                        navigate(
                          `/restaurant/${restaurant.id}`
                        )
                      }
                      className="
                        w-full

                        bg-gradient-to-r
                        from-[#FF7A1A]
                        to-[#FF9A4D]

                        text-white

                        py-3

                        rounded-2xl

                        font-semibold

                        shadow-md

                        hover:shadow-lg
                        hover:scale-[1.02]

                        transition-all
                      "
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
}