import { useState } from "react";

export default function OrderTracking() {
  // Temporary Demo Status
  const [status] = useState("accepted");

  const statuses = [
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
      key: "collected",
      title: "Collected",
      icon: "🎉",
    },
  ];

  const currentIndex =
    statuses.findIndex(
      (item) => item.key === status
    );

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
                SB12345
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
              Accepted
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

          <button
            className="
              mt-4
              w-full
              bg-[#FF7A1A]
              text-white
              py-3
              rounded-2xl
              font-semibold
            "
          >
            Call Restaurant
          </button>
        </div>
      </div>
    </div>
  );
}