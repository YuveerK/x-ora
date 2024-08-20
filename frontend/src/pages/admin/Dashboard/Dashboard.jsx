import React from "react";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./Home/AdminHome";
const Dashboard = () => {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />

      <Routes>
        <Route path="home" element={<AdminHome />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
