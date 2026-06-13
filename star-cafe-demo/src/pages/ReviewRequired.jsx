import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ReviewRequired() {

  const navigate =
    useNavigate();

    const {
  addToCart,
  clearCart,
} = useCart();

  const orderId =
    localStorage.getItem(
      "currentOrderId"
    );

  const reviewMessage =
    localStorage.getItem(
      "reviewMessage"
    );


const handleCancelOrder =
  async () => {

    try {

      await api.put(
        `/orders/${orderId}`,
        {
          status: "cancelled",
        }
      );

      navigate(
        "/order-cancelled"
      );

    } catch (error) {

      console.error(error);

    }
  };



  const handleModifyOrder =
  async () => {

    try {

      const res =
        await api.get(
          `/order/${orderId}`
        );

      const order =
        res.data;

        localStorage.setItem(
  "editingOrderData",
  JSON.stringify(order)
);

      clearCart();

      order.items.forEach(
        (item) => {

          for (
            let i = 0;
            i < item.quantity;
            i++
          ) {
            addToCart(item);
          }

        }
      );

      localStorage.setItem(
        "editingOrder",
        orderId
      );

      navigate("/home");

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7F0] flex items-center justify-center px-4">

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-[32px]
          p-6
          shadow-sm
        "
      >

        <div className="text-center">

          <div className="text-6xl">
            ⚠️
          </div>

          <h1
            className="
              text-3xl
              font-bold
              mt-4
            "
          >
            Restaurant Update
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Please review the message
            from the restaurant.
          </p>

        </div>

        <div
          className="
            mt-6
            bg-yellow-50
            border
            border-yellow-200
            rounded-2xl
            p-4
          "
        >

          <p className="font-semibold">
            Message
          </p>

          <p className="mt-2 text-gray-700">
            {reviewMessage}
          </p>

        </div>

<button
  onClick={handleModifyOrder}
  className="
    w-full
    mt-6

    bg-[#FF7A1A]
    text-white

    py-4

    rounded-2xl

    font-semibold

    shadow-lg
  "
>
  Modify Order
</button>

<button
  onClick={handleCancelOrder}
  className="
    w-full
    mt-3

    bg-red-500
    text-white

    py-4

    rounded-2xl

    font-semibold
  "
>
  Cancel Entire Order
</button>

      </div>

    </div>
  );
}