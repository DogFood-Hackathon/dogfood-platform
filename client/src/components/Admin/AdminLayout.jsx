import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import "../../css/Admin/AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminNavbar />

      <div className="admin-layout-body">
        <AdminSidebar />

        <main className="admin-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;