import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../pages/Administrador/sidebar/sidebarAdmin";

export default function DashboardLayout() {
  useEffect(() => {
    import("../styles/admin/dashboard/dashboardAdmin.css");
    import("../styles/admin/sidebar/sidebarAdminX.css");
  }, []);

  return (
    <div className="admin-wrapper admin-background with-sidebar">
      <SidebarAdmin />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
