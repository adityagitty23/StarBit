import {
  LayoutDashboard,
  Store,
  QrCode,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/starbit-logo.png";

export default function Sidebar() {
  const navigate = useNavigate();

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
      label: "QR Codes",
      icon: QrCode,
      path: "#",
    },
    {
  label: "Analytics",
  icon: BarChart3,
  path: "/analytics",
},
    {
      label: "Settings",
      icon: Settings,
      path: "#",
    },
  ];

  return (
    <div
      className="
        w-[280px]
        min-h-screen

        bg-white/40
        backdrop-blur-xl

        border-r
        border-white/30

        shadow-xl
      "
    >
      <div className="p-6 border-b border-white/30">

        <img
          src={logo}
          alt="StarBit"
          className="
            h-16
            mx-auto
            object-contain
          "
        />

        <p
          className="
            text-center
            text-sm
            text-gray-500
            mt-2
          "
        >
          Owner Panel
        </p>

      </div>

      <div className="p-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() =>
                navigate(item.path)
              }
              className="
                w-full

                flex
                items-center
                gap-3

                px-4
                py-3

                rounded-2xl

                hover:bg-white/60

                transition-all
                duration-300
              "
            >
              <Icon size={20} />

              {item.label}
            </button>
          );
        })}

      </div>

      <div className="absolute bottom-5 left-4 right-4">

<button
  onClick={() => {

    navigate(
      "/superadmin-login"
    );

  }}
  className="
    w-full

    flex
    items-center
    gap-3

    px-4
    py-3

    rounded-2xl

    bg-red-50
    text-red-600
  "
>
  <LogOut size={20} />

  Logout
</button>

      </div>
    </div>
  );
}