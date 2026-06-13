import { useNavigate } from "react-router-dom";

export default function OrderCancelled() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center px-4">

      <div
        className="
          w-full
          max-w-md

          bg-white/70
          backdrop-blur-xl

          border
          border-white/50

          rounded-[32px]

          p-6

          shadow-xl

          text-center
        "
      >

        <div
          className="
            h-24
            w-24

            mx-auto

            rounded-full

            bg-red-100

            flex
            items-center
            justify-center

            text-5xl
          "
        >
          🚫
        </div>

        <h1
          className="
            text-3xl
            font-bold
            mt-6
          "
        >
          Order Cancelled
        </h1>

        <p
          className="
            text-gray-500
            mt-3
          "
        >
          Your order has been cancelled successfully.
        </p>

        <button
          onClick={() =>
            navigate("/home")
          }
          className="
            w-full

            mt-8

            bg-[#FF7A1A]
            text-white

            py-4

            rounded-2xl

            font-semibold

            shadow-lg

            hover:scale-[1.02]
            transition-all
          "
        >
          Back To Menu
        </button>

      </div>

    </div>
  );
}