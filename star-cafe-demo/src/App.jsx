import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

import OrderSubmitted from "./pages/OrderSubmitted";
import OrderTracking from "./pages/OrderTracking";
import ReviewRequired from "./pages/ReviewRequired";
import Payment from "./pages/Payment";
import OrderCompleted from "./pages/OrderCompleted";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;