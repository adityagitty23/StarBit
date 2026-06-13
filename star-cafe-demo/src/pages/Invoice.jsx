import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import restaurantConfig from "../config/restaurantConfig";

export default function Invoice() {
  const { orderId } = useParams();

  const [order, setOrder] =
    useState(null);

  useEffect(() => {
    const fetchOrder =
      async () => {
        try {
          const res =
            await api.get(
              `/order/${orderId}`
            );

          setOrder(
            res.data
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Invoice...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex justify-center p-4">

      <div
        className="
          w-full
          max-w-lg

          bg-white/80
          backdrop-blur-xl

          rounded-[32px]

          p-6

          shadow-xl
        "
      >

        {/* Restaurant Header */}

        <h1 className="text-3xl font-bold text-center">
          {restaurantConfig.restaurantName}
        </h1>

        <p className="text-center text-gray-500 mt-1">
          {restaurantConfig.address}
        </p>

        <p className="text-center text-xs text-gray-400 mt-1">
          Powered by StarBit Creative
        </p>

        {/* Invoice Info */}

        <div className="mt-6 border-t pt-4 space-y-2">

          <p>
            <strong>Order ID:</strong>{" "}
            {order.orderId}
          </p>

          <p>
            <strong>Customer:</strong>{" "}
            {order.customerName}
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            {order.mobile}
          </p>

          <p>
            <strong>Payment:</strong>{" "}
            {order.paymentMethod || "Cash"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {order.status
              ?.replaceAll("_", " ")
              .toUpperCase()}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              order.createdAt
            ).toLocaleString()}
          </p>

        </div>

        {/* Items */}

        <div className="border-t mt-6 pt-4">

          <h2 className="font-semibold mb-3">
            Order Items
          </h2>

          {order.items?.map(
            (item) => (
              <div
                key={item.id}
                className="flex justify-between py-2"
              >
                <span>
                  {item.name} ×{" "}
                  {item.quantity}
                </span>

                <span>
                  ₹
                  {item.price *
                    item.quantity}
                </span>
              </div>
            )
          )}

        </div>

        {/* Total */}

        <div className="border-t mt-6 pt-4">

          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span className="text-[#FF7A1A]">
              ₹{order.total}
            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t mt-6 pt-4 text-center">

          <p className="text-sm text-gray-500">
            Thank you for ordering from
          </p>

          <p className="font-semibold mt-1">
            {restaurantConfig.restaurantName}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Growing Your Business,
            Bit by Bit.
          </p>

        </div>

        {/* Print */}

        <button
          onClick={() =>
            window.print()
          }
          className="
            w-full

            mt-6

            bg-[#FF7A1A]
            text-white

            py-4

            rounded-2xl

            font-semibold

            shadow-lg

            hover:bg-[#ff8c3a]

            transition
          "
        >
          🖨️ Print Invoice
        </button>

      </div>

    </div>
  );
}