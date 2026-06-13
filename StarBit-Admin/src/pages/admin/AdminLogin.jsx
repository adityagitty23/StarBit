import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import logo from "../../assets/logo/starbit-logo.png";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    if (
      !username.trim()
    ) {
      alert(
        "Please enter mobile number"
      );
      return;
    }

    if (
      !password.trim()
    ) {
      alert(
        "Please enter password"
      );
      return;
    }

    try {

      setLoading(true);

      const res =
        await api.post(
          "/restaurant/login",
          {
            username,
            password,
          }
        );

      if (
        res.data.success
      ) {

        localStorage.setItem(
          "restaurantId",
          res.data.restaurantId
        );

        localStorage.setItem(
          "restaurantName",
          res.data.restaurantName
        );

        navigate(
          "/admin-dashboard"
        );
      }

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleKeyPress = (
    e
  ) => {

    if (
      e.key === "Enter"
    ) {
      handleLogin();
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
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2">
            Sign in to continue
          </p>

        </div>

        {/* Mobile */}

        <input
          type="text"
          placeholder="Mobile Number"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyPress
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
          onKeyDown={
            handleKeyPress
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
          onClick={
            handleLogin
          }
          disabled={
            loading
          }
          className="
            w-full
            bg-[#FF7A1A]
            text-white
            py-4
            rounded-2xl
            font-semibold
            disabled:opacity-50
          "
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>

        {/* Forgot Password */}

        <button
          className="
            w-full
            mt-4
            text-[#FF7A1A]
            text-sm
          "
        >
          Forgot Password?
        </button>

        {/* Super Admin */}

        <button
          onClick={() =>
            navigate(
              "/superadmin-login"
            )
          }
          className="
            w-full
            mt-2
            text-gray-500
            text-sm
            underline
          "
        >
          Admin Login
        </button>

      </div>

    </div>
  );
}