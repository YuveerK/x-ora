import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../../constants/env.const";
import { useRecoilState } from "recoil";
import { userState } from "../../../../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post(`${baseUrl}/login`, data);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setError("");
      navigate("/admin/dashboard/home");
    } catch (error) {
      setError(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Login
        </h2>
        {error && (
          <h3 className="text-center mt-2 font-bold text-red-500">{error}</h3>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to={"/admin/register"}
              className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
