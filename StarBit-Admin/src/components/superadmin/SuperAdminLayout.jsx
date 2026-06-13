import { useState } from "react";
import Sidebar from "../../pages/superadmin/Sidebar";

export default function SuperAdminLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#FFF7F0]
        via-[#FFF2E8]
        to-[#FFE6D1]
      "
    >
      {/* Mobile Toggle */}

      <button
        onClick={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
        className="
          fixed
          top-4
          left-4
          z-[100]

          bg-[#FF7A1A]
          text-white

          px-4
          py-2

          rounded-xl
          shadow-lg

          lg:hidden
        "
      >
        ☰
      </button>

      <div className="flex">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main
          className={`
            flex-1
            min-w-0

            p-4
            md:p-6
            lg:p-8

            transition-all
            duration-300

            ${
              sidebarOpen
                ? "lg:ml-0"
                : "lg:ml-0"
            }
          `}
        >
          {children}
        </main>

      </div>

      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/30
            z-40
            lg:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}
    </div>
  );
}