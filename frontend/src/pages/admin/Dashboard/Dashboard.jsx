import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./Home/AdminHome";
import Rentals from "./Rentals/Rentals";
import MaintenanceRequests from "./Maintenance-Requests/MaintenanceRequests";
import Invoices from "./Invoices/Invoices";
const Dashboard = () => {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />

      <Routes>
        <Route path="home" element={<AdminHome />} />
        <Route path="rentals" element={<Rentals />} />
        <Route path="maintenance-requests" element={<MaintenanceRequests />} />
        <Route path="invoices" element={<Invoices />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
