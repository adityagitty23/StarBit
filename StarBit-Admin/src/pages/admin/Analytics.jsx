import {
useEffect,
useState,
} from "react";

import {
useNavigate,
} from "react-router-dom";

import api from "../../services/api";

export default function Analytics() {


const [restaurant, setRestaurant] =
  useState(null);

const BACKEND_URL =
  "http://127.0.0.1:5000";

const navigate =
useNavigate();

const [orders, setOrders] =
useState([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {

const fetchOrders =
  async () => {

const restaurantId =
  localStorage.getItem(
    "restaurantId"
  );

const restaurantRes =
  await api.get(
    `/restaurants/${restaurantId}`
  );

setRestaurant(
  restaurantRes.data
);

    try {

      const restaurantId =
        localStorage.getItem(
          "restaurantId"
        );

      const res =
        await api.get(
          `/restaurants/${restaurantId}/orders`
        );

      setOrders(
        res.data
      );

    } catch (error) {

      console.error(
        error
      );

    } finally {

      setLoading(
        false
      );

    }

  };

fetchOrders();

}, []);

if (loading) {

return (
  <div className="min-h-screen flex items-center justify-center">
    Loading Analytics...
  </div>
);

}

const totalOrders =
orders.length;

const completedOrders =
orders.filter(
(o) =>
o.status ===
"completed"
).length;

const cancelledOrders =
orders.filter(
(o) =>
o.status ===
"cancelled"
).length;

const reviewRequiredOrders =
orders.filter(
(o) =>
o.status ===
"review_required"
).length;

const revenue =
orders
.filter(
(o) =>
o.status ===
"completed"
)
.reduce(
(
total,
order
) =>
total +
Number(
order.total || 0
),
0
);

const cashOrders =
  orders.filter(
    (order) =>
      order.paymentMethod ===
      "cash"
  );

const upiOrders =
  orders.filter(
    (order) =>
      order.paymentMethod ===
      "upi"
  );

const cashRevenue =
  cashOrders.reduce(
    (total, order) =>
      total +
      Number(
        order.total || 0
      ),
    0
  );

const upiRevenue =
  upiOrders.reduce(
    (total, order) =>
      total +
      Number(
        order.total || 0
      ),
    0
  );

const todayOrders =
orders.filter(
(order) => {

    const today =
      new Date()
        .toDateString();

    return (
      new Date(
        order.createdAt
      ).toDateString()
      === today
    );

  }
).length;

const averageOrderValue =
completedOrders > 0
? Math.round(
revenue /
completedOrders
)
: 0;

return (

<div className="min-h-screen bg-[#FFF7F0] p-6">

  <button
    onClick={() =>
      navigate(
        "/admin-dashboard"
      )
    }
    className="
      mb-6

      bg-white/70
      backdrop-blur-xl

      border
      border-white/50

      px-5
      py-3

      rounded-2xl
    "
  >
    ← Back
  </button>

  <h1
    className="
      text-4xl
      font-bold
    "
  >
    Analytics
  </h1>

  <p className="text-gray-500 mt-2">
    Business Overview
  </p>

  <div
    className="
      grid
      grid-cols-2
      lg:grid-cols-3
      gap-4
      mt-8
    "
  >

    <AnalyticsCard
      title="Total Orders"
      value={totalOrders}
    />

    <AnalyticsCard
      title="Revenue"
      value={`₹${revenue}`}
      orange
    />

    <AnalyticsCard
      title="Completed"
      value={completedOrders}
    />

    <AnalyticsCard
      title="Cancelled"
      value={cancelledOrders}
    />

    <AnalyticsCard
      title="Review Required"
      value={reviewRequiredOrders}
    />

    <AnalyticsCard
      title="Today Orders"
      value={todayOrders}
    />

  </div>

  <div
    className="
      mt-8

      bg-white/70
      backdrop-blur-xl

      border
      border-white/50

      rounded-[32px]

      p-6
    "
  >

    <h2
      className="
        text-xl
        font-bold
        mb-4
      "
    >
      Performance
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">

        <span>
          Average Order Value
        </span>

        <span
          className="
            font-semibold
            text-[#FF7A1A]
          "
        >
          ₹
          {
            averageOrderValue
          }
        </span>

      </div>

      <div
  className="
    mt-8

    bg-white/70
    backdrop-blur-xl

    border
    border-white/50

    rounded-[32px]

    p-6
  "
>

  <h2
    className="
      text-xl
      font-bold
      mb-6
    "
  >
    Cash vs UPI Analytics
  </h2>

  <div
    className="
      grid
      grid-cols-2
      gap-4
    "
  >

    <AnalyticsCard
      title="Cash Orders"
      value={
        cashOrders.length
      }
    />

    <AnalyticsCard
      title="UPI Orders"
      value={
        upiOrders.length
      }
    />

    <AnalyticsCard
      title="Cash Revenue"
      value={`₹${cashRevenue}`}
      orange
    />

    <AnalyticsCard
      title="UPI Revenue"
      value={`₹${upiRevenue}`}
      orange
    />

  </div>

</div>

<div
  className="
    mt-6

    bg-white/70
    backdrop-blur-xl

    border
    border-white/50

    rounded-[32px]

    p-6
  "
>

  <h2
    className="
      text-xl
      font-bold
      mb-4
    "
  >
    Payment Preference
  </h2>

  <div className="space-y-4">

    <div>

      <div className="flex justify-between mb-2">

        <span>Cash</span>

        <span>
          {cashOrders.length}
        </span>

      </div>

      <div
        className="
          h-3
          bg-gray-200
          rounded-full
          overflow-hidden
        "
      >

        <div
          className="
            h-full
            bg-[#FF7A1A]
          "
          style={{
            width: `${
              orders.length
                ? (
                    cashOrders.length /
                    orders.length
                  ) * 100
                : 0
            }%`,
          }}
        />

      </div>

    </div>

    <div>

      <div className="flex justify-between mb-2">

        <span>UPI</span>

        <span>
          {upiOrders.length}
        </span>

      </div>

      <div
        className="
          h-3
          bg-gray-200
          rounded-full
          overflow-hidden
        "
      >

        <div
          className="
            h-full
            bg-green-500
          "
          style={{
            width: `${
              orders.length
                ? (
                    upiOrders.length /
                    orders.length
                  ) * 100
                : 0
            }%`,
          }}
        />

      </div>

    </div>

  </div>

</div>
{/* Restaurant QR */}

<div
  className="
    mt-8

    bg-white/70
    backdrop-blur-xl

    border
    border-white/50

    rounded-[32px]

    p-6

    shadow-sm
  "
>

  <h2
    className="
      text-xl
      font-bold
      mb-4
    "
  >
    Restaurant QR
  </h2>

  <p
    className="
      text-gray-500
      mb-6
    "
  >
    Download and print this QR
    for tables, counters and
    marketing materials.
  </p>

  {restaurant && (

    <div className="text-center">

      <img
        src={
          `${BACKEND_URL}${restaurant.websiteQr}`
        }
        alt="Restaurant QR"
        className="
          w-40
          mx-auto
          rounded-2xl
          border
          border-gray-100
        "
      />

      <div
        className="
          flex
          justify-center
          gap-3
          mt-6
        "
      >

        <a
          href={
            `${BACKEND_URL}${restaurant.websiteQr}`
          }
          target="_blank"
          rel="noreferrer"
          className="
            bg-white

            px-5
            py-3

            rounded-2xl

            border
            border-gray-200

            font-medium
          "
        >
          Preview
        </a>

        <a
  href={
    `${BACKEND_URL}/download-qr/${restaurant.id}`
  }
  className="
    bg-[#FF7A1A]
    text-white

    px-5
    py-3

    rounded-2xl

    font-medium
  "
>
  Download QR
</a>

      </div>

    </div>

  )}

</div>

      <div className="flex justify-between">

        <span>
          Revenue
        </span>

        <span
          className="
            font-semibold
            text-[#FF7A1A]
          "
        >
          ₹{revenue}
        </span>

      </div>

      <div className="flex justify-between">

        <span>
          Completed Orders
        </span>

        <span className="font-semibold">
          {completedOrders}
        </span>

      </div>

    </div>

  </div>

</div>

);

}

function AnalyticsCard({
title,
value,
orange,
}) {

return (

<div
  className="
    bg-white/70
    backdrop-blur-xl

    border
    border-white/50

    rounded-[28px]

    p-5

    shadow-sm
  "
>

  <p className="text-gray-500">
    {title}
  </p>

  <h2
    className={`
      text-3xl
      font-bold
      mt-2

      ${
        orange
          ? "text-[#FF7A1A]"
          : "text-black"
      }
    `}
  >
    {value}
  </h2>

</div>

);

}
