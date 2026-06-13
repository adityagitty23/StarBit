import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import restaurantConfig
from "../config/restaurantConfig";

export default function UpiPayment() {

  const navigate = useNavigate();

  const [order, setOrder] =
    useState(null);

  useEffect(() => {

    const fetchOrder =
      async () => {

        const orderId =
          localStorage.getItem(
            "currentOrderId"
          );

        const res =
          await api.get(
            `/order/${orderId}`
          );

        setOrder(
          res.data
        );

      };

    fetchOrder();

  }, []);

  const handlePaid =
    async () => {

      await api.put(
        `/orders/${order.orderId}`,
        {
          paymentMethod:
            "upi",

          paymentStatus:
            "paid",

          status:
            "preparing",
        }
      );

      navigate(
        "/order-tracking"
      );

    };

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex justify-center">

      <div
        className="
          w-full
          max-w-md

          px-4
          py-6
        "
      >

        <div
          className="
            bg-white/70
            backdrop-blur-xl

            border
            border-white/50

            rounded-[32px]

            p-6

            shadow-lg
          "
        >

          <h1 className="text-2xl font-bold text-center">
            Scan & Pay
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Complete payment using any UPI app
          </p>

          <img
            src={restaurantConfig.upiQr}
            alt="UPI QR"
            className="
              w-64
              h-64

              mx-auto

              mt-6
            "
          />

          <div
            className="
              mt-4

              bg-orange-50

              rounded-2xl

              p-4

              text-center
            "
          >

            <p className="text-sm text-gray-500">
              Amount
            </p>

            <p className="text-3xl font-bold text-[#FF7A1A]">
              ₹{order?.total}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              UPI ID
            </p>

            <p className="font-semibold">
              payments@starcafe
            </p>

          </div>

          <button
            onClick={handlePaid}
            className="
              w-full

              mt-6

              bg-[#FF7A1A]
              text-white

              py-4

              rounded-2xl

              font-semibold
            "
          >
            I Have Paid
          </button>

        </div>

      </div>

    </div>
  );
}