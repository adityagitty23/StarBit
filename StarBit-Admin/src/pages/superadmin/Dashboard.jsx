import SuperAdminLayout from "../../components/superadmin/SuperAdminLayout";
import { getRestaurants } from "../../services/restaurantService";

export default function Dashboard() {
  const restaurants =
    getRestaurants();

  const activeRestaurants =
    restaurants.filter(
      (r) =>
        r.status === "active"
    ).length;

  return (
    <SuperAdminLayout>

      {/* Top Bar */}

      <div
        className="
          bg-white/50
          backdrop-blur-xl

          border
          border-white/30

          rounded-[32px]

          p-6

          mb-6
        "
      >
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, Aditya 👋
        </p>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-4
          gap-5
        "
      >
        <div
          className="
            bg-white/60
            backdrop-blur-xl

            border
            border-white/40

            rounded-[32px]

            p-6

            shadow-lg

            hover:scale-[1.02]

            transition-all
          "
        >
          <p className="text-gray-500">
            Restaurants
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {restaurants.length}
          </h2>
        </div>

        <div
          className="
            bg-white/60
            backdrop-blur-xl

            border
            border-white/40

            rounded-[32px]

            p-6

            shadow-lg

            hover:scale-[1.02]

            transition-all
          "
        >
          <p className="text-gray-500">
            Active
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-3
              text-green-600
            "
          >
            {activeRestaurants}
          </h2>
        </div>

        <div
          className="
            bg-white/60
            backdrop-blur-xl

            border
            border-white/40

            rounded-[32px]

            p-6

            shadow-lg

            hover:scale-[1.02]

            transition-all
          "
        >
          <p className="text-gray-500">
            Orders Today
          </p>

          <h2 className="text-4xl font-bold mt-3">
            0
          </h2>
        </div>

        <div
          className="
            bg-white/60
            backdrop-blur-xl

            border
            border-white/40

            rounded-[32px]

            p-6

            shadow-lg

            hover:scale-[1.02]

            transition-all
          "
        >
          <p className="text-gray-500">
            Revenue
          </p>

          <h2 className="text-4xl font-bold mt-3">
            ₹0
          </h2>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="mt-8">

        <h2
          className="
            text-2xl
            font-bold
            mb-4
          "
        >
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">

          <button
            className="
              bg-[#FF7A1A]
              text-white

              px-6
              py-4

              rounded-2xl

              shadow-lg
            "
          >
            + Create Restaurant
          </button>

          <button
            className="
              bg-white/70
              backdrop-blur-xl

              px-6
              py-4

              rounded-2xl
            "
          >
            Generate QR
          </button>

          <button
            className="
              bg-white/70
              backdrop-blur-xl

              px-6
              py-4

              rounded-2xl
            "
          >
            View Orders
          </button>

        </div>

      </div>

    </SuperAdminLayout>
  );
}