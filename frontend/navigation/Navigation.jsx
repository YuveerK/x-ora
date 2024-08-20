import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../src/pages/admin/auth/AdminLogin";
import AdminRegister from "../src/pages/admin/auth/AdminRegister";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import Dashboard from "../src/pages/admin/Dashboard/Dashboard";
const Navigation = () => {
  const user = useRecoilValue(userState);

  console.log(user);
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* Admin Dashboard */}
      <Route path="/admin/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
};

export default Navigation;
