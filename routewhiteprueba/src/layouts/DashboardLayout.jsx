import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../pages/Administrador/sidebar/sidebarAdmin";
import "../styles/admin/sidebar/sidebarAdminX.css";


export default function DashboardLayout() {
  return (
    <div className="layout-with-fixed-sidebar">
      <SidebarAdmin />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
