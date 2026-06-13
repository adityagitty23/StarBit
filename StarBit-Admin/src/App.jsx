import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SuperAdminLogin from "./pages/superadmin/SuperAdminLogin";
import Dashboard from "./pages/superadmin/Dashboard";
import Restaurants from "./pages/superadmin/Restaurants";
import CreateRestaurant from "./pages/superadmin/CreateRestaurant";
import RestaurantDetails from "./pages/superadmin/RestaurantDetails";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Orders from "./pages/admin/Orders";
import Analytics
from "./pages/admin/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Restaurant Login (Default Page) */}
        <Route
          path="/"
          element={<AdminLogin />}
        />

        {/* Super Admin Login */}
        <Route
          path="/superadmin-login"
          element={<SuperAdminLogin />}
        />

        {/* Super Admin Pages */}
        <Route
          path="/superadmin-dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/restaurants"
          element={<Restaurants />}
        />

        <Route
          path="/create-restaurant"
          element={<CreateRestaurant />}
        />

        <Route
          path="/restaurant/:id"
          element={<RestaurantDetails />}
        />

        {/* Restaurant Admin Pages */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
  path="/analytics"
  element={<Analytics />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;