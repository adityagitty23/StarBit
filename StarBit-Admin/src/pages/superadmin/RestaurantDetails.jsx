import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

export default function RestaurantDetails() {
  const { id } = useParams();

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
      <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Loading...
        </h1>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7F0] p-6">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-[32px] p-8 shadow-sm">

          <div className="flex justify-between items-start">

            <div>

              <h1 className="text-4xl font-bold">
                {
                  restaurant.restaurantName
                }
              </h1>

              <p className="text-gray-500 mt-2">
                Restaurant Details
              </p>

            </div>

            <span
              className={`
                px-4
                py-2
                rounded-full
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

          <div className="mt-8 space-y-4">

            <p>
              <strong>ID:</strong>{" "}
              {restaurant.id}
            </p>

            <p>
              <strong>Owner:</strong>{" "}
              {restaurant.ownerName}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {restaurant.mobile}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {restaurant.email}
            </p>

            <p>
              <strong>Website:</strong>{" "}
              {restaurant.websiteUrl}
            </p>

            <p>
              <strong>Username:</strong>{" "}
              {restaurant.username}
            </p>

            <p>
              <strong>Password:</strong>{" "}
              {restaurant.password}
            </p>

          </div>

          {/* Password Change */}

          <div className="mt-10 border-t pt-8">

            <h2 className="text-2xl font-bold mb-4">
              Change Password
            </h2>

            <input
              type="text"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              className="
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                mb-4
              "
            />

            <button
              onClick={
                handlePasswordChange
              }
              className="
                bg-[#FF7A1A]
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
              "
            >
              Change Password
            </button>

          </div>

          {/* Status */}

          <div className="mt-10 border-t pt-8">

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
                  text-white
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
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
                  text-white
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
                "
              >
                Enable Restaurant
              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}