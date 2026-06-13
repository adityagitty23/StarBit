import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminLayout from "../../components/superadmin/SuperAdminLayout";
import api from "../../services/api";

export default function Dashboard() {
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

  const activeRestaurants =
    restaurants.filter(
      (r) =>
        r.status === "active"
    ).length;

  return (
    <SuperAdminLayout>
      <div className="space-y-6">

        {/* Hero */}

        <div
          className="
            bg-gradient-to-r
            from-[#FF7A1A]
            to-[#FF9A4D]
            rounded-3xl
            p-5 md:p-8
            text-white
            shadow-xl
          "
        >
          <h1 className="text-2xl md:text-4xl font-bold">
            👑 Super Admin Dashboard
          </h1>

          <p className="text-white/80 mt-2">
            Manage all your restaurant clients from one place.
          </p>
        </div>

        {/* Stats */}

        <div
          className="
            grid
            grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          <StatCard
            title="Restaurants"
            value={restaurants.length}
          />

          <StatCard
            title="Active"
            value={activeRestaurants}
            color="text-green-600"
          />

          <StatCard
            title="Orders Today"
            value="0"
            color="text-blue-600"
          />

          <StatCard
            title="Revenue"
            value="₹0"
            color="text-[#FF7A1A]"
          />
        </div>

        {/* Quick Actions */}

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Quick Actions
          </h2>

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
            "
          >
            <ActionCard
              icon="🏪"
              title="Create"
              subtitle="Restaurant"
              orange
              onClick={() =>
                navigate(
                  "/create-restaurant"
                )
              }
            />

            <ActionCard
              icon="🍽️"
              title="Manage"
              subtitle="Restaurants"
              onClick={() =>
                navigate(
                  "/restaurants"
                )
              }
            />

            <ActionCard
              icon="📊"
              title="Analytics"
              subtitle="Overview"
              onClick={() =>
                navigate(
                  "/analytics"
                )
              }
            />

            <ActionCard
              icon="⚙️"
              title="Settings"
              subtitle="Coming Soon"
            />
          </div>
        </div>

        {/* Recent Restaurants */}

        <div
          className="
            bg-white/60
            backdrop-blur-xl
            border
            border-white/50
            rounded-3xl
            p-5 md:p-6
            shadow-lg
          "
        >
          <h2 className="text-2xl font-bold mb-5">
            Recent Restaurants
          </h2>

          {loading ? (
            <p className="text-gray-500">
              Loading...
            </p>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">
                🍽️
              </div>

              <p className="text-gray-500">
                No restaurants added yet
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/create-restaurant"
                  )
                }
                className="
                  mt-4
                  bg-[#FF7A1A]
                  text-white
                  px-5
                  py-2
                  rounded-xl
                "
              >
                Create First Restaurant
              </button>
            </div>
          ) : (
            <div className="space-y-3">

              {[...restaurants]
                .sort(
                  (a, b) =>
                    new Date(
                      b.createdAt || 0
                    ) -
                    new Date(
                      a.createdAt || 0
                    )
                )
                .slice(0, 5)
                .map(
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
                        bg-white/60
                        rounded-2xl
                        p-4
                        hover:bg-white/80
                        transition-all
                      "
                    >
                      <div>
                        <h3 className="font-semibold text-lg">
                          {
                            restaurant.restaurantName
                          }
                        </h3>

                        <p className="text-sm text-gray-500">
                          {
                            restaurant.id
                          }
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Created:
                          {" "}
                          {restaurant.createdAt
                            ? new Date(
                                restaurant.createdAt
                              ).toLocaleString()
                            : "N/A"}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          restaurant.status ===
                          "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
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
        bg-white/60
        backdrop-blur-xl
        border
        border-white/50
        rounded-3xl
        p-4 md:p-5
        shadow-lg
      "
    >
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2
        className={`text-2xl md:text-4xl font-bold mt-2 ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  orange,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        ${
          orange
            ? "bg-gradient-to-r from-[#FF7A1A] to-[#FF9A4D] text-white"
            : "bg-white/60 backdrop-blur-xl border border-white/50"
        }
        rounded-3xl
        p-4
        shadow-lg
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        text-center
      `}
    >
      <div className="text-3xl mb-2">
        {icon}
      </div>

      <h3 className="font-bold">
        {title}
      </h3>

      <p
        className={`text-sm ${
          orange
            ? "text-white/80"
            : "text-gray-500"
        }`}
      >
        {subtitle}
      </p>
    </button>
  );
}