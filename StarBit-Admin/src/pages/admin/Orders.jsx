import {
  useEffect,
  useState,
} from "react";

import api from "../../services/api";

export default function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [reviewOrderId, setReviewOrderId] =
  useState(null);

  const [reviewMessage, setReviewMessage] =
  useState("");

const updateStatus = async (
  orderId,
  status,
  reviewMessage = ""
) => {

  try {

    await api.put(
      `/orders/${orderId}`,
      {
        status,
        reviewMessage,
      }
    );

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

  }
};


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

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF7F0] p-6">

      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      {orders.length === 0 ? (

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          No Orders Yet
        </div>

      ) : (

        <div className="space-y-5">

          {orders.map(
           (order, index) => (

              <div
                key={
                  order.orderId
                }
                className="
                  bg-white
                  p-5
                  rounded-3xl
                  shadow-sm
                "
              >

                <div className="flex justify-between">

                  <div>

                    <p className="text-xs text-gray-400">
                      Order #{index + 1}
                    </p>

                    <h2 className="text-xl font-bold">
                      {
                        order.customerName
                      }
                    </h2>

                    <p className="text-gray-500">
                      {
                        order.mobile
                      }
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {
                        order.orderId
                      }
                    </p>

                  </div>

<span
  className={`
    px-3
    py-1
    rounded-full

    ${
      order.status === "payment_required"
      ? "bg-cyan-100 text-cyan-700"
      : order.status === "accepted"
        ? "bg-green-100 text-green-700"
        : order.status === "preparing"
        ? "bg-orange-100 text-orange-700"
        : order.status === "ready_for_pickup"
        ? "bg-blue-100 text-blue-700"
        : order.status === "completed"
        ? "bg-purple-100 text-purple-700"
        : order.status === "cancelled"
        ? "bg-gray-100 text-gray-700"
        : order.status === "rejected"
        ? "bg-red-100 text-red-700"
        : order.status === "review_required"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-yellow-100 text-yellow-700"
    }
  `}
>
  {order.status
    .replaceAll("_", " ")
    .toUpperCase()}
</span>

                </div>

                <div className="mt-4">

                  <h3 className="font-semibold mb-2">
                    Items
                  </h3>

                  {order.items?.map(
                    (item) => (

                      <div
                        key={
                          item.id
                        }
                        className="
                          flex
                          justify-between
                          py-1
                        "
                      >
                        <span>
                          {
                            item.name
                          }
                          {" × "}
                          {
                            item.quantity
                          }
                        </span>

                        <span>
                          ₹
                          {
                            item.price *
                            item.quantity
                          }
                        </span>
                      </div>

                    )
                  )}

                </div>

                {order.reviewMessage && (

  <div
    className="
      mt-4
      bg-yellow-50
      border
      border-yellow-200
      rounded-2xl
      p-4
    "
  >
    <p className="font-semibold text-yellow-700">
      Review Message
    </p>

    <p className="text-sm text-gray-700 mt-1">
      {order.reviewMessage}
    </p>

  </div>

)}

                <div className="border-t mt-4 pt-4 flex justify-between items-center">

                  <span className="text-xl font-bold text-[#FF7A1A]">
                    ₹
                    {
                      order.total
                    }
                  </span>

                  <div className="flex flex-wrap gap-2">

{order.status ===
  "pending" && (

  <>
    <button
      onClick={() =>
        updateStatus(
          order.orderId,
          "payment_required"
        )
      }
      className="
        bg-green-500
        text-white
        px-4
        py-2
        rounded-xl
      "
    >
      Accept
    </button>

<button
  onClick={() =>
    setReviewOrderId(
      order.orderId
    )
  }
  className="
    bg-yellow-500
    text-white
    px-4
    py-2
    rounded-xl
  "
>
  Review
</button>



    <button
      onClick={() =>
        updateStatus(
          order.orderId,
          "rejected"
        )
      }
      className="
        bg-red-500
        text-white
        px-4
        py-2
        rounded-xl
      "
    >
      Reject
    </button>
  </>
)}
{order.status ===
  "review_required" && (

  <div className="flex gap-2">

    <span
      className="
        bg-yellow-100
        text-yellow-700
        px-4
        py-2
        rounded-xl
        font-medium
      "
    >
      Awaiting Customer Review
    </span>

  </div>

)}

                    {order.status ===
                      "accepted" && (

                      <button
                        onClick={() =>
                          updateStatus(
                            order.orderId,
                            "preparing"
                          )
                        }
                        className="
                          bg-orange-500
                          text-white
                          px-4
                          py-2
                          rounded-xl
                        "
                      >
                        Preparing
                      </button>

                    )}

                    {order.status ===
                      "preparing" && (

                      <button
                        onClick={() =>
                          updateStatus(
                            order.orderId,
                            "ready_for_pickup"
                          )
                        }
                        className="
                          bg-blue-500
                          text-white
                          px-4
                          py-2
                          rounded-xl
                        "
                      >
                        Ready
                      </button>

                    )}

                    {order.status ===
                      "ready_for_pickup" && (

                      <button
                        onClick={() =>
                          updateStatus(
                            order.orderId,
                            "completed"
                          )
                        }
                        className="
                          bg-purple-500
                          text-white
                          px-4
                          py-2
                          rounded-xl
                        "
                      >
                        Complete
                      </button>

                    )}

                    {order.status === "cancelled" && (

  <span
    className="
      bg-gray-100
      text-gray-700
      px-4
      py-2
      rounded-xl
      font-medium
    "
  >
    Cancelled By Customer
  </span>

)}

                    {order.status ===
  "rejected" && (

  <span
    className="
      bg-red-100
      text-red-700
      px-4
      py-2
      rounded-xl
      font-medium
    "
  >
    Rejected
  </span>

)}

                  </div>

                </div>

                {
  reviewOrderId === order.orderId && (

    <div
      className="
        mt-4
        bg-yellow-50
        border
        border-yellow-200
        rounded-2xl
        p-4
      "
    >

      <textarea
        value={reviewMessage}
        onChange={(e) =>
          setReviewMessage(
            e.target.value
          )
        }
        placeholder="Enter message for customer..."
        rows="3"
        className="
          w-full
          border
          border-yellow-200
          rounded-2xl
          p-3
          resize-none
          mb-3
        "
      />

      <div className="flex gap-2">

        <button
          onClick={() => {

            if (
              !reviewMessage.trim()
            ) {
              return;
            }

            updateStatus(
              order.orderId,
              "review_required",
              reviewMessage
            );

            setReviewMessage("");
            setReviewOrderId(null);

          }}
          className="
            bg-yellow-500
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Send Review
        </button>

        <button
          onClick={() => {
            setReviewOrderId(null);
            setReviewMessage("");
          }}
          className="
            border
            px-4
            py-2
            rounded-xl
          "
        >
          Cancel
        </button>

      </div>

    </div>

  )
}

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}