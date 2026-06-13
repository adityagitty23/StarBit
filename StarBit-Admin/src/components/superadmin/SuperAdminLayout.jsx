import Sidebar from "../../pages/superadmin/Sidebar";

export default function SuperAdminLayout({
  children,
}) {
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
      <div className="flex">
        <Sidebar />

        <main
          className="
            flex-1

            min-w-0

            p-4
            md:p-6
            lg:p-8
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}