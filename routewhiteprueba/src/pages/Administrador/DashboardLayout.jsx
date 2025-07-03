import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./sidebarAdmin";
import "../../assets/sidebarAdminX.css";
 // o sidebarAdminX.css según cómo lo tengas

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarAdmin />
      <div className="dashboard-main" style={{ flex: 1, padding: "25px" }}>
        <Outlet />
      </div>
    </div>
  );
}
