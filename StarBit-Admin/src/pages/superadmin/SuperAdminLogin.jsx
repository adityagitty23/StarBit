import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import logo from "../../assets/logo/starbit-logo.png";

export default function SuperAdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

const handleLogin = async () => {
  try {
    const res = await api.post(
      "/superadmin/login",
      {
        username,
        password,
      }
    );

    if (res.data.success) {
      navigate(
        "/superadmin-dashboard"
      );
    } else {
      alert(
        "Invalid Credentials"
      );
    }
  } catch (error) {
    alert(
      "Invalid Credentials"
    );

    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center p-4">

      <div
        className="
          bg-white
          rounded-[32px]
          p-8
          w-full
          max-w-md
          shadow-lg
        "
      >
        {/* Logo */}

        <div className="text-center mb-8">

          <img
            src={logo}
            alt="StarBit"
            className="
              h-24
              mx-auto
              object-contain
            "
          />

          <h2
            className="
              text-2xl
              font-bold
              mt-4
            "
          >
            Super Admin Login
          </h2>

          <p className="text-gray-500 mt-2">
            StarBit Owner Panel
          </p>

        </div>

        {/* Username */}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
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
            outline-none
          "
        />

        {/* Password */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-gray-200
            rounded-2xl
            p-4
            mb-5
            outline-none
          "
        />

        {/* Login */}

        <button
          onClick={handleLogin}
          className="
            w-full
            bg-[#FF7A1A]
            text-white
            py-4
            rounded-2xl
            font-semibold
          "
        >
          Login
        </button>

        {/* Back */}

        <button
          onClick={() =>
            navigate("/")
          }
          className="
            w-full
            mt-4
            text-gray-500
            text-sm
            underline
          "
        >
          Back to Restaurant Login
        </button>

      </div>

    </div>
  );
}