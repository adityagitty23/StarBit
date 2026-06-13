import {
  LayoutDashboard,
  Store,
  Settings,
  LogOut,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import logo from "../../assets/logo/starbit-logo.png";

export default function Sidebar({
  sidebarOpen,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/superadmin-dashboard",
    },
    {
      label: "Restaurants",
      icon: Store,
      path: "/restaurants",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "#",
    },
  ];

  return (
    <aside
      className={`
        fixed lg:static
        top-0 left-0
        z-50

        flex flex-col

        h-screen

        bg-white/70
        backdrop-blur-xl

        border-r
        border-white/50

        shadow-xl

        transition-all
        duration-300

        ${
          sidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full lg:w-20"
        }
      `}
    >
      {/* Logo */}

      <div className="p-6 border-b border-white/40">
        <img
          src={logo}
          alt="StarBit"
          className="h-14 mx-auto object-contain"
        />

        {sidebarOpen && (
          <p
            className="
              text-center
              text-gray-500
              text-sm
              mt-3
            "
          >
            Super Admin Panel
          </p>
        )}
      </div>

      {/* Menu */}

      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            location.pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() =>
                navigate(item.path)
              }
              className={`
                w-full

                flex
                items-center

                ${
                  sidebarOpen
                    ? "justify-start gap-3"
                    : "justify-center"
                }

                px-4
                py-3

                rounded-2xl

                transition-all
                duration-300

                ${
                  active
                    ? "bg-[#FF7A1A] text-white shadow-md"
                    : "hover:bg-white text-gray-700"
                }
              `}
            >
              <Icon size={20} />

              {sidebarOpen && (
                <span className="font-medium">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Logout */}

      <div className="p-4">
        <button
          onClick={() =>
            navigate("/superadmin-login")
          }
          className="
            w-full

            flex
            items-center

            justify-center
            lg:justify-start

            gap-3

            px-4
            py-3

            rounded-2xl

            bg-red-50
            text-red-600

            hover:bg-red-100

            transition-all
          "
        >
          <LogOut size={20} />

          {sidebarOpen && "Logout"}
        </button>
      </div>
    </aside>
  );
}