import Sidebar from "../../pages/superadmin/Sidebar";

export default function SuperAdminLayout({
  children,
}) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1">
        {children}
      </div>

    </div>
  );
}