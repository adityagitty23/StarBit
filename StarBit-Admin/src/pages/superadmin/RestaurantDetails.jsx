import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] =
    useState(null);

  const [newPassword, setNewPassword] =
    useState("");

  useEffect(() => {
    const fetchRestaurant =
      async () => {
        try {
          const res =
            await api.get(
              `/restaurants/${id}`
            );

          setRestaurant(
            res.data
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchRestaurant();
  }, [id]);

  const updateRestaurant =
    async (updatedRestaurant) => {
      try {
        await api.put(
          `/restaurants/${id}`,
          updatedRestaurant
        );

        setRestaurant(
          updatedRestaurant
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handlePasswordChange =
    async () => {
      if (!newPassword.trim()) {
        alert(
          "Enter New Password"
        );
        return;
      }

      const updatedRestaurant = {
        ...restaurant,
        password:
          newPassword,
      };

      await updateRestaurant(
        updatedRestaurant
      );

      alert(
        "Password Updated"
      );

      setNewPassword("");
    };

  const handleDisable =
    async () => {
      const updatedRestaurant = {
        ...restaurant,
        status: "inactive",
      };

      await updateRestaurant(
        updatedRestaurant
      );

      alert(
        "Restaurant Disabled"
      );
    };

  const handleEnable =
    async () => {
      const updatedRestaurant = {
        ...restaurant,
        status: "active",
      };

      await updateRestaurant(
        updatedRestaurant
      );

      alert(
        "Restaurant Enabled"
      );
    };

  if (!restaurant) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#FFF7F0]
        "
      >
        <h1 className="text-3xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#FFF7F0]
        via-[#FFF2E8]
        to-[#FFE6D1]
        p-4 md:p-6
      "
    >
      <div className="max-w-5xl mx-auto space-y-6">

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
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              justify-between
              gap-4
            "
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                🍽️ {restaurant.restaurantName}
              </h1>

              <p className="text-white/80 mt-2">
                Restaurant Details
              </p>
            </div>

            <span
              className={`
                px-4
                py-2
                rounded-2xl
                font-semibold
                h-fit

                ${
                  restaurant.status ===
                  "active"
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              `}
            >
              {restaurant.status}
            </span>
          </div>
        </div>

        {/* Restaurant Info */}

        <div
          className="
            bg-white/60
            backdrop-blur-xl
            border
            border-white/50
            rounded-3xl
            p-6
            shadow-lg
          "
        >
          <h2 className="text-2xl font-bold mb-5">
            Restaurant Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <InfoItem
              label="Restaurant ID"
              value={restaurant.id}
            />

            <InfoItem
              label="Owner"
              value={restaurant.ownerName}
            />

            <InfoItem
              label="Mobile"
              value={restaurant.mobile}
            />

            <InfoItem
              label="Email"
              value={restaurant.email}
            />

            <InfoItem
              label="Website"
              value={restaurant.websiteUrl}
            />

            <InfoItem
              label="Username"
              value={restaurant.username}
            />

            <InfoItem
              label="Password"
              value="********"
            />

          </div>
        </div>

        {/* Change Password */}

        <div
          className="
            bg-white/60
            backdrop-blur-xl
            border
            border-white/50
            rounded-3xl
            p-6
            shadow-lg
          "
        >
          <h2 className="text-2xl font-bold mb-4">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            className="
              w-full
              bg-white/70
              border
              border-white/60
              rounded-2xl
              p-4
              mb-4
              outline-none
            "
          />

          <button
            onClick={
              handlePasswordChange
            }
            className="
              bg-gradient-to-r
              from-[#FF7A1A]
              to-[#FF9A4D]
              text-white
              px-6
              py-3
              rounded-2xl
              font-semibold
              shadow-lg
            "
          >
            Update Password
          </button>
        </div>

        {/* Controls */}

        <div
          className="
            bg-white/60
            backdrop-blur-xl
            border
            border-white/50
            rounded-3xl
            p-6
            shadow-lg
          "
        >
          <h2 className="text-2xl font-bold mb-4">
            Account Controls
          </h2>

          {restaurant.status ===
          "active" ? (
            <button
              onClick={
                handleDisable
              }
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
                transition-all
              "
            >
              Disable Restaurant
            </button>
          ) : (
            <button
              onClick={
                handleEnable
              }
              className="
                bg-green-500
                hover:bg-green-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
                transition-all
              "
            >
              Enable Restaurant
            </button>
          )}

          <button
            onClick={() =>
              navigate("/restaurants")
            }
            className="
              ml-3
              bg-gray-200
              hover:bg-gray-300
              px-6
              py-3
              rounded-2xl
              font-semibold
              transition-all
            "
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
}) {
  return (
    <div
      className="
        bg-white/50
        rounded-2xl
        p-4
      "
    >
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold mt-1">
        {value || "-"}
      </p>
    </div>
  );
}