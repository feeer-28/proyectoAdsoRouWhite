// src/layouts/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import SidebarAdmin from "../pages/Administrador/sidebar/sidebarAdmin";

// Ajusta este import EXACTO a la ubicación real
import "../styles/admin/dashboard/dashboardAdmin.css";
import "../styles/admin/sidebar/sidebarAdminX.css";

export default function DashboardLayout() {
  return (
    <div className="with-sidebar">
      <SidebarAdmin />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
