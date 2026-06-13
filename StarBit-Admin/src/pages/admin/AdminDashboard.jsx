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
    <div className="min-h-screen flex items-center justify-center bg-[#FFF7F0]">
      <div className="text-center">
        <div className="text-5xl mb-4">🍽️</div>
        <p className="text-lg font-semibold text-[#FF7A1A]">
          Loading Dashboard...
        </p>
      </div>
    </div>
  );
}

return (

<div className="min-h-screen bg-gradient-to-br from-[#FFF7F0] via-[#FFF2E8] to-[#FFE6D1] p-6">

<div
  className="
    bg-gradient-to-r
    from-[#FF7A1A]
    to-[#FF9A4D]
    rounded-3xl
    p-8
    text-white
    shadow-xl
  "
>
  <h1 className="text-4xl font-bold">
    🍽️ {restaurantName}
  </h1>

  <p className="text-white/80 mt-2">
    Welcome back to your dashboard
  </p>
</div>

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

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

  <button
    onClick={() => navigate("/orders")}
    className="
      bg-white/70
      backdrop-blur-xl
      border
      border-white/60
      rounded-3xl
      p-6
      shadow-lg
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
    "
  >
    <div className="text-4xl">📦</div>
    <p className="font-semibold mt-2">
      Orders
    </p>
  </button>

  <button
    onClick={() => navigate("/analytics")}
    className="
      bg-white/70
      backdrop-blur-xl
      border
      border-white/60
      rounded-3xl
      p-6
      shadow-lg
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
    "
  >
    <div className="text-4xl">📊</div>
    <p className="font-semibold mt-2">
      Analytics
    </p>
  </button>

  <button
    onClick={() => {
      localStorage.removeItem("restaurantId");
      localStorage.removeItem("restaurantName");
      navigate("/");
    }}
    className="
      bg-red-500
      text-white
      rounded-3xl
      p-6
      shadow-lg
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
    "
  >
    <div className="text-4xl">🚪</div>
    <p className="font-semibold mt-2">
      Logout
    </p>
  </button>

</div>

{/* Recent Orders */}

<div
  className="
    mt-8
    bg-white/70
    backdrop-blur-xl
    border
    border-white/60
    rounded-3xl
    p-6
    shadow-lg
  "
>
  <h2 className="text-xl font-bold mb-4">
    Recent Orders
  </h2>

  {orders.length === 0 ? (
    <p className="text-gray-500">
      No orders yet
    </p>
  ) : (
    orders.slice(0, 5).map((order) => (
      <div
        key={order.orderId}
        className="
          flex
          justify-between
          items-center
          py-4
          border-b
          border-gray-100
        "
      >
        <div>
          <p className="font-semibold">
            {order.customerName}
          </p>

          <p className="text-sm text-gray-500">
            {order.orderId}
          </p>
        </div>

        <span
          className="
            px-3
            py-1
            rounded-full
            bg-orange-100
            text-[#FF7A1A]
            text-xs
            font-semibold
          "
        >
          {order.status}
        </span>
      </div>
    ))
  )}
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
        border-white/60
        rounded-3xl
        p-5
        shadow-lg
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <p
        className="
          text-gray-500
          text-sm
          font-medium
        "
      >
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
              : "text-gray-900"
          }
        `}
      >
        {value}
      </h2>
    </div>
  );
}
