import {
  useState,
  useEffect,
} from "react";

import api from "../services/api";
import restaurantConfig
from "../config/restaurantConfig";

  
export default function OrderTracking() {

  const [order, setOrder] =
  useState(null);

const [loading, setLoading] =
  useState(true);

 const statuses = [
  {
    key: "pending",
    title: "Order Received",
    icon: "⏳",
  },

  {
    key: "accepted",
    title: "Order Accepted",
    icon: "✅",
  },

  {
    key: "preparing",
    title: "Preparing",
    icon: "👨‍🍳",
  },

  {
    key: "ready_for_pickup",
    title: "Ready For Pickup",
    icon: "📦",
  },

  {
  key: "completed",
  title: "Completed",
  icon: "🎉",
},
{
  key: "cancelled",
  title: "Cancelled",
  icon: "🚫",
},
{
  key: "rejected",
  title: "Order Rejected",
  icon: "❌",
},

];

const currentStatus =
  order?.status || "pending";

const currentIndex =
  statuses.findIndex(
    (item) =>
      item.key === currentStatus
  );

const handleCancelOrder =
  async () => {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this order?"
      );

    if (!confirmCancel) {
      return;
    }

    try {

      await api.put(
        `/orders/${order.orderId}`,
        {
          status: "cancelled",
        }
      );

      window.location.href =
        "/order-cancelled";

    } catch (error) {

      console.error(error);

    }
  };

    useEffect(() => {

  const fetchOrder =
    async () => {

      try {

        const orderId =
          localStorage.getItem(
            "currentOrderId"
          );

        if (!orderId) {
          setLoading(false);
          return;
        }

const res =
  await api.get(
    `/order/${orderId}`
  );

if (
  res.data.status ===
  "rejected"
) {

  window.location.href =
    "/order-rejected";

  return;

}

if (
  res.data.status ===
  "cancelled"
) {

  window.location.href =
    "/order-cancelled";

  return;

}

if (
  res.data.status ===
  "payment_required"
) {

  window.location.href =
    "/payment";

  return;

}

if (
  res.data.status ===
  "review_required"
) {

  localStorage.setItem(
    "reviewMessage",
    res.data.reviewMessage || ""
  );

  window.location.href =
    "/review-required";

  return;

}

if (
  res.data.status === "completed" ||
  res.data.status === "cancelled" ||
  res.data.status === "rejected"
) {

  localStorage.removeItem(
    "activeOrder"
  );

  localStorage.removeItem(
    "currentOrderId"
  );

  localStorage.removeItem(
    "currentOrderType"
  );

}

setOrder(
  res.data
);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  fetchOrder();

  const interval =
    setInterval(
      fetchOrder,
      5000
    );

  return () =>
    clearInterval(interval);

}, []);

if (loading) {

  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading Order...
    </div>
  );
}


  return (
    <div className="min-h-screen bg-[#FFF7F0] flex justify-center">
      <div
        className="
          w-full
          max-w-[768px]
          px-4
          py-6
        "
      >
        {/* Header */}

        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
          "
        >
          Track Order
        </h1>

        <p className="text-gray-500 mt-2">
          Follow your order status
        </p>

        {/* Order Card */}

        <div
          className="
            mt-6
            bg-white
            rounded-[28px]
            p-5
            shadow-sm
          "
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">
                Order ID
              </p>

              <h2 className="font-bold text-xl">
                {order?.orderId}
              </h2>
            </div>

            <div
              className="
                bg-orange-100
                text-[#FF7A1A]
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
                h-fit
              "
            >
              {currentStatus
  .replaceAll("_", " ")
  .toUpperCase()}
            </div>
          </div>
        </div>

        {/* Timeline */}

        <div
          className="
            mt-6
            bg-white
            rounded-[28px]
            p-6
            shadow-sm
          "
        >
          <h2
            className="
              font-semibold
              text-lg
              mb-6
            "
          >
            Order Progress
          </h2>

          {statuses.map(
            (item, index) => {
              const active =
                index <= currentIndex;

              return (
                <div
                  key={item.key}
                  className="
                    flex
                    gap-4
                    relative
                  "
                >
                  {/* Line */}

                  {index !==
                    statuses.length -
                      1 && (
                    <div
                      className={`
                        absolute
                        left-[18px]
                        top-10
                        w-[2px]
                        h-12

                        ${
                          active
                            ? "bg-[#FF7A1A]"
                            : "bg-gray-200"
                        }
                      `}
                    />
                  )}

                  {/* Circle */}

                  <div
                    className={`
                      h-10
                      w-10
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-lg

                      ${
                        active
                          ? "bg-[#FF7A1A] text-white"
                          : "bg-gray-200"
                      }
                    `}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}

                  <div className="pb-10">
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {active
                        ? "Completed"
                        : "Waiting"}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>

        <div
  className="
    mt-6

    bg-white/70
    backdrop-blur-xl

    border
    border-white/50

    rounded-[28px]

    p-5

    shadow-sm
  "
>



</div>

        {/* Help Card */}

        <div
          className="
            mt-6
            bg-white
            rounded-[28px]
            p-5
            shadow-sm
          "
        >
          <h2 className="font-semibold">
            Need Help?
          </h2>

          <p className="text-gray-500 mt-2">
            Contact the restaurant if
            you have any questions
            about your order.
          </p>

          {(
  order?.status === "pending" ||
  order?.status === "accepted"
) && (

  <button
    onClick={
      handleCancelOrder
    }
    className="
      w-full

      mb-4

      bg-red-500/90
      backdrop-blur-xl

      text-white

      py-3

      rounded-2xl

      font-semibold

      shadow-lg

      hover:bg-red-600

      transition-all
    "
  >
    Cancel Order
  </button>

)}

            <a
              href={`tel:${restaurantConfig.mobile}`}
              className="
                block
                mt-4
                w-full
                bg-[#FF7A1A]
                text-white
                py-3
                rounded-2xl
                font-semibold
                text-center
              "
            >
              Call Restaurant
            </a>

            <button
  onClick={() =>
    window.open(
      `/invoice/${order.orderId}`,
      "_blank"
    )
  }
  className="
    w-full

    mt-3

    bg-white/70
    backdrop-blur-xl

    border
    border-[#FF7A1A]

    text-[#FF7A1A]

    py-3

    rounded-2xl

    font-semibold
  "
>
  Download Invoice
</button>
        </div>
      </div>
    </div>
  );
}