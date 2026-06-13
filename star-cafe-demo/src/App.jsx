import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

import OrderSubmitted from "./pages/OrderSubmitted";
import OrderTracking from "./pages/OrderTracking";
import ReviewRequired from "./pages/ReviewRequired";
import Payment from "./pages/Payment";
import OrderCompleted from "./pages/OrderCompleted";
import OrderRejected
from "./pages/OrderRejected";
import OrderCancelled
from "./pages/OrderCancelled";
import UpiPayment from "./pages/UpiPayment";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route
  path="/order-submitted"
  element={<OrderSubmitted />}
/>

<Route
  path="/order-tracking"
  element={<OrderTracking />}
/>

<Route
  path="/review-required"
  element={<ReviewRequired />}
/>

<Route
  path="/payment"
  element={<Payment />}
/>

<Route
  path="/order-completed"
  element={<OrderCompleted />}
/>
<Route
  path="/order-cancelled"
  element={<OrderCancelled />}
/>
<Route
  path="/order-rejected"
  element={<OrderRejected />}
/>
<Route
  path="/upi-payment"
  element={<UpiPayment />}
/>
<Route
  path="/invoice/:orderId"
  element={<Invoice />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;