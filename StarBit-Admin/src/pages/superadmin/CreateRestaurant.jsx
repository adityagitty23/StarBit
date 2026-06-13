import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function CreateRestaurant() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    mobile: "",
    email: "",
    websiteUrl: "",
    username: "",
    password: "",
  });

  const generateRestaurantId = () => {
    return (
      "STAR" +
      Math.floor(
        1000 + Math.random() * 9000
      )
    );
  };

  const handleCreate = async () => {
    if (
      !formData.restaurantName ||
      !formData.mobile ||
      !formData.password
    ) {
      alert("Fill all required fields");
      return;
    }

    try {
      const restaurant = {
        ...formData,

        id: generateRestaurantId(),

        status: "active",
      };

      await api.post(
        "/restaurants",
        restaurant
      );

      alert(
        "Restaurant Created Successfully"
      );

      navigate("/restaurants");

    } catch (error) {
      console.error(error);

      alert(
        "Failed To Create Restaurant"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7F0] p-6">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold">
          Create Restaurant
        </h1>

        <p className="text-gray-500 mt-2">
          Add New Client
        </p>

        <div className="bg-white rounded-[32px] p-6 mt-6">

          <input
            type="text"
            placeholder="Restaurant Name"
            value={formData.restaurantName}
            onChange={(e) =>
              setFormData({
                ...formData,
                restaurantName:
                  e.target.value,
              })
            }
            className="w-full border rounded-2xl p-4 mb-4"
          />

          <input
            type="text"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={(e) =>
              setFormData({
                ...formData,
                ownerName:
                  e.target.value,
              })
            }
            className="w-full border rounded-2xl p-4 mb-4"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({
                ...formData,
                mobile:
                  e.target.value,
              })
            }
            className="w-full border rounded-2xl p-4 mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email:
                  e.target.value,
              })
            }
            className="w-full border rounded-2xl p-4 mb-4"
          />

          <input
            type="text"
            placeholder="Website URL"
            value={formData.websiteUrl}
            onChange={(e) =>
              setFormData({
                ...formData,
                websiteUrl:
                  e.target.value,
              })
            }
            className="w-full border rounded-2xl p-4 mb-4"
          />

          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username:
                  e.target.value,
              })
            }
            className="w-full border rounded-2xl p-4 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password:
                  e.target.value,
              })
            }
            className="w-full border rounded-2xl p-4 mb-6"
          />

          <button
            onClick={handleCreate}
            className="
              w-full
              bg-[#FF7A1A]
              text-white
              py-4
              rounded-2xl
              font-semibold
            "
          >
            Create Restaurant
          </button>

        </div>

      </div>

    </div>
  );
}