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
        createdAt: new Date().toISOString(),
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
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div
          className="
            bg-gradient-to-r
            from-[#FF7A1A]
            to-[#FF9A4D]
            rounded-3xl
            p-6 md:p-8
            text-white
            shadow-xl
            mb-6
          "
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            🏪 Create Restaurant
          </h1>

          <p className="text-white/80 mt-2">
            Add a new client to StarBit
          </p>
        </div>

        {/* Form */}

        <div
          className="
            bg-white/60
            backdrop-blur-xl
            border
            border-white/50
            rounded-3xl
            p-5 md:p-8
            shadow-xl
          "
        >
          <div
            className="
              grid
              md:grid-cols-2
              gap-5
            "
          >
            <InputField
              label="Restaurant Name"
              value={formData.restaurantName}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  restaurantName: value,
                })
              }
            />

            <InputField
              label="Owner Name"
              value={formData.ownerName}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  ownerName: value,
                })
              }
            />

            <InputField
              label="Mobile Number"
              value={formData.mobile}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  mobile: value,
                })
              }
            />

            <InputField
              label="Email"
              value={formData.email}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  email: value,
                })
              }
            />

            <InputField
              label="Website URL"
              value={formData.websiteUrl}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  websiteUrl: value,
                })
              }
            />

            <InputField
              label="Username"
              value={formData.username}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  username: value,
                })
              }
            />

            <div className="md:col-span-2">
              <InputField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    password: value,
                  })
                }
              />
            </div>
          </div>

          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-4
              mt-8
            "
          >
            <button
              onClick={handleCreate}
              className="
                flex-1
                bg-gradient-to-r
                from-[#FF7A1A]
                to-[#FF9A4D]
                text-white
                py-4
                rounded-2xl
                font-semibold
                shadow-lg
                hover:shadow-xl
                transition-all
              "
            >
              Create Restaurant
            </button>

            <button
              onClick={() =>
                navigate("/restaurants")
              }
              className="
                flex-1
                bg-white
                py-4
                rounded-2xl
                font-semibold
                border
                border-gray-200
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label
        className="
          block
          text-sm
          font-medium
          mb-2
          text-gray-700
        "
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          bg-white/70
          border
          border-white/60
          rounded-2xl
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-[#FF7A1A]
        "
      />
    </div>
  );
}