import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
const [cartItems, setCartItems] = useState([]);
const [isCartOpen, setIsCartOpen] = useState(false);

const addToCart = (item) => {
const existingItem = cartItems.find(
(cartItem) => cartItem.id === item.id
);

if (existingItem) {
  setCartItems(
    cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    )
  );
} else {
  setCartItems([
    ...cartItems,
    {
      ...item,
      quantity: 1,
    },
  ]);
}
};

const increaseQuantity = (id) => {
setCartItems(
cartItems.map((item) =>
item.id === id
? {
...item,
quantity: item.quantity + 1,
}
: item
)
);
};

const decreaseQuantity = (id) => {
setCartItems(
cartItems
.map((item) =>
item.id === id
? {
...item,
quantity: item.quantity - 1,
}
: item
)
.filter((item) => item.quantity > 0)
);
};

const clearCart = () => {
setCartItems([]);
};

const totalItems = cartItems.reduce(
(total, item) => total + item.quantity,
0
);

const totalPrice = cartItems.reduce(
(total, item) =>
total + item.price * item.quantity,
0
);

return (
<CartContext.Provider
value={{
cartItems,
addToCart,
increaseQuantity,
decreaseQuantity,
clearCart,

    totalItems,
    totalPrice,

    isCartOpen,
    setIsCartOpen,
  }}
>
  {children}
</CartContext.Provider>

);
};

export const useCart = () => {
return useContext(CartContext);
};
