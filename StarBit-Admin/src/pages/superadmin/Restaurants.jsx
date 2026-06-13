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

        }

      };

    fetchRestaurants();

  }, []);

  return (
    <SuperAdminLayout>

      {/* Header */}

      <div
        className="
          bg-white/50
          backdrop-blur-xl
          border
          border-white/30
          rounded-[32px]
          p-6
          mb-6
          flex
          justify-between
          items-center
        "
      >
        <div>

          <h1 className="text-4xl font-bold">
            Restaurants
          </h1>

          <p className="text-gray-500 mt-2">
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
            flex
            items-center
            gap-2
            bg-[#FF7A1A]
            text-white
            px-5
            py-3
            rounded-2xl
            shadow-lg
          "
        >
          <Plus size={18} />

          Create Restaurant

        </button>

      </div>

      {/* Restaurant Cards */}

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
        "
      >

        {restaurants.map(
          (restaurant) => (

            <div
              key={restaurant.id}
              className="
                bg-white/60
                backdrop-blur-xl
                border
                border-white/40
                rounded-[32px]
                p-6
                shadow-lg
              "
            >

              {/* Top */}

              <div className="flex justify-between">

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
                    className="
                      text-[#FF7A1A]
                    "
                  />
                </div>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-medium
                    ${
                      restaurant.status ===
                      "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {restaurant.status}
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

              <div
                className="
                  mt-6
                  flex
                  gap-2
                "
              >

                <button
                  onClick={() =>
                    navigate(
                      `/restaurant/${restaurant.id}`
                    )
                  }
                  className="
                    flex-1
                    bg-[#FF7A1A]
                    text-white
                    py-3
                    rounded-2xl
                    font-medium
                  "
                >
                  View
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </SuperAdminLayout>
  );
}