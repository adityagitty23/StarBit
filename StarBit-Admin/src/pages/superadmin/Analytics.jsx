import { useEffect, useState } from "react";
import api from "../../services/api";
import SuperAdminLayout from "../../components/superadmin/SuperAdminLayout";

export default function Analytics() {
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

  const totalRestaurants =
    restaurants.length;

  const activeRestaurants =
    restaurants.filter(
      (r) =>
        r.status === "active"
    ).length;

  const inactiveRestaurants =
    restaurants.filter(
      (r) =>
        r.status === "inactive"
    ).length;

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

            p-6
            md:p-8

            text-white

            shadow-xl

            mb-8
          "
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            📊 Analytics
          </h1>

          <p className="text-white/80 mt-2">
            Real-time restaurant statistics
          </p>
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
            Loading...
          </div>
        ) : (
          <>
            {/* Stats */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-5
              "
            >
              <StatCard
                title="Total Restaurants"
                value={
                  totalRestaurants
                }
              />

              <StatCard
                title="Active"
                value={
                  activeRestaurants
                }
                color="text-green-600"
              />

              <StatCard
                title="Inactive"
                value={
                  inactiveRestaurants
                }
                color="text-red-500"
              />
            </div>

            {/* Restaurants List */}

            <div
              className="
                mt-8

                bg-white/70
                backdrop-blur-xl

                border
                border-white/60

                rounded-3xl

                p-6

                shadow-lg
              "
            >
              <h2
                className="
                  text-2xl
                  font-bold
                  mb-5
                "
              >
                Restaurants
              </h2>

              {restaurants.length ===
              0 ? (
                <p className="text-gray-500">
                  No restaurants found.
                </p>
              ) : (
                <div className="space-y-4">
                  {restaurants.map(
                    (
                      restaurant
                    ) => (
                      <div
                        key={
                          restaurant.id
                        }
                        className="
                          flex
                          justify-between
                          items-center

                          border-b
                          border-gray-100

                          pb-3
                        "
                      >
                        <div>
                          <h3 className="font-semibold">
                            {
                              restaurant.restaurantName
                            }
                          </h3>

                          <p className="text-sm text-gray-500">
                            {
                              restaurant.id
                            }
                          </p>
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
                          {
                            restaurant.status
                          }
                        </span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </SuperAdminLayout>
  );
}

function StatCard({
  title,
  value,
  color = "text-gray-900",
}) {
  return (
    <div
      className="
        bg-white/70
        backdrop-blur-xl

        border
        border-white/60

        rounded-3xl

        p-6

        shadow-lg

        hover:shadow-xl
        hover:-translate-y-1

        transition-all
      "
    >
      <p className="text-gray-500">
        {title}
      </p>

      <h2
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}