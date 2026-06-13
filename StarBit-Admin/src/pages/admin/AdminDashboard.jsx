import {
useEffect,
useState,
} from "react";

import {
useNavigate,
} from "react-router-dom";


import api from "../../services/api";

export default function AdminDashboard() {


const navigate =
useNavigate();

const [orders, setOrders] =
useState([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {

let mounted = true;

const fetchOrders =
  async () => {

    try {

      const restaurantId =
        localStorage.getItem(
          "restaurantId"
        );

      if (!restaurantId) {
        return;
      }

      const res =
        await api.get(
          `/restaurants/${restaurantId}/orders`
        );

      if (mounted) {

        setOrders(
          res.data
        );

        setLoading(
          false
        );

      }

    } catch (error) {

      console.error(
        error
      );

      if (mounted) {

        setLoading(
          false
        );

      }

    }

  };

fetchOrders();

const interval =
  setInterval(
    fetchOrders,
    5000
  );

return () => {

  mounted = false;

  clearInterval(
    interval
  );

};

}, []);

const restaurantName =
localStorage.getItem(
"restaurantName"
) || "Restaurant";

const totalOrders =
orders.length;

const pendingOrders =
orders.filter(
(order) =>
order.status ===
"pending"
).length;

const acceptedOrders =
orders.filter(
(order) =>
order.status ===
"accepted"
).length;

const preparingOrders =
orders.filter(
(order) =>
order.status ===
"preparing"
).length;

const completedOrders =
orders.filter(
(order) =>
order.status ===
"completed"
).length;

const cancelledOrders =
orders.filter(
(order) =>
order.status ===
"cancelled"
).length;

const reviewRequiredOrders =
orders.filter(
(order) =>
order.status ===
"review_required"
).length;

const revenue =
orders
.filter(
(order) =>
order.status ===
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

if (loading) {

return (
  <div className="min-h-screen flex items-center justify-center">
    Loading Dashboard...
  </div>
);

}

return (

<div className="min-h-screen bg-[#FFF7F0] p-6">

  <h1 className="text-4xl font-bold">
    {restaurantName}
  </h1>

  <p className="text-gray-500 mt-2">
    Welcome Back
  </p>

  {/* Analytics Cards */}

  <div
    className="
      grid
      grid-cols-2
      lg:grid-cols-3
      gap-4
      mt-8
    "
  >

    <DashboardCard
      title="Total Orders"
      value={totalOrders}
    />

    <DashboardCard
      title="Pending"
      value={pendingOrders}
    />

    <DashboardCard
      title="Accepted"
      value={acceptedOrders}
    />

    <DashboardCard
      title="Preparing"
      value={preparingOrders}
    />

    <DashboardCard
      title="Completed"
      value={completedOrders}
    />

    <DashboardCard
      title="Revenue"
      value={`₹${revenue}`}
      orange
    />

    <DashboardCard
      title="Cancelled"
      value={cancelledOrders}
    />

    <DashboardCard
      title="Review Required"
      value={reviewRequiredOrders}
    />

  </div>

  {/* Today Overview */}

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
      Today's Overview
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span>
          Orders Today
        </span>

        <span className="font-semibold">
          {todayOrders}
        </span>
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

    </div>

  </div>

  {/* Actions */}

  <div className="flex gap-4 mt-8">

    <button
      onClick={() =>
        navigate(
          "/orders"
        )
      }
      className="
        bg-[#FF7A1A]
        text-white
        px-6
        py-3
        rounded-2xl
      "
    >
      View Orders
    </button>

    <button
    onClick={() =>
      navigate("/analytics")
    }
    className="
      bg-[#0084ff]
      text-white
      backdrop-blur-xl

      border
      border-white/50

      px-6
      py-3

      rounded-2xl
    "
  >
    View Analytics
  </button>

    <button
      onClick={() => {

        localStorage.removeItem(
          "restaurantId"
        );

        localStorage.removeItem(
          "restaurantName"
        );

        navigate("/");

      }}
      className="
        bg-red-500
        text-white
        px-6
        py-3
        rounded-2xl
      "
    >
      Logout
    </button>

  </div>

</div>

);

}

function DashboardCard({
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
