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
import Analytics from "./pages/admin/Analytics";
import SuperAdminAnalytics from "./pages/superadmin/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Restaurant Admin Login */}
        <Route
          path="/"
          element={<AdminLogin />}
        />

        {/* Super Admin Login */}
        <Route
          path="/superadmin-login"
          element={<SuperAdminLogin />}
        />

        {/* Super Admin */}
        <Route
          path="/superadmin-dashboard"
          element={<Dashboard />}
        />

        <Route
  path="/superadmin-analytics"
  element={<SuperAdminAnalytics />}
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

        {/* Restaurant Admin */}
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

        

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-[#FFF7F0]">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-[#FF7A1A]">
                  404
                </h1>

                <p className="text-gray-500 mt-2">
                  Page Not Found
                </p>
              </div>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;