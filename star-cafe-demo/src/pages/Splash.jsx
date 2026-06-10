import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/starbit-logo.png";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="
        min-h-screen
        bg-white
        flex
        items-center
        justify-center
        relative
        overflow-hidden
      "
    >
      {/* Glow Top */}

      <div
        className="
          absolute
          top-[-120px]
          left-[-120px]
          w-[320px]
          h-[320px]
          bg-[#FF7A1A]
          opacity-10
          blur-[120px]
          rounded-full
        "
      />

      {/* Glow Bottom */}

      <div
        className="
          absolute
          bottom-[-150px]
          right-[-150px]
          w-[380px]
          h-[380px]
          bg-[#FF7A1A]
          opacity-15
          blur-[140px]
          rounded-full
        "
      />

      <div
        className="
          flex
          flex-col
          items-center
          animate-fadeInUp
          z-10
        "
      >
        {/* Logo */}

        <img
          src={logo}
          alt="StarBit"
          className="
            w-56
            md:w-72
            animate-float
          "
        />

        {/* Loading Text */}

        <p
          className="
            mt-8
            text-gray-500
            font-medium
            tracking-wide
          "
        >
          Preparing your experience...
        </p>

        {/* Loader */}

        <div className="relative mt-6 h-14 w-14">
          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-orange-100
            "
          />

          <div
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-transparent
              border-t-[#FF7A1A]
              animate-spin
            "
          />
        </div>

        {/* Branding */}

        <p
          className="
            mt-8
            text-xs
            text-gray-400
          "
        >
          Powered by StarBit Creative
        </p>
      </div>
    </div>
  );
}