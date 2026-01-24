import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../services/baseurl";
import { useEffect, useState } from "react";
import Profile from "../profile/Profile";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await baseUrl.get("Auth/me");
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-emerald-200 to-teal-300">

      {/* Navbar */}
      <div className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 shadow-lg px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>

        {/* Profile Section */}
        <div className="relative">
          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="cursor-pointer"
          >
            <Profile />
          </div>

          {/* Dropdown */}
          {openMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl overflow-hidden z-50">
              <button
                onClick={goToSignup}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-green-100 transition"
              >
                ➕ New Signup
              </button>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-100 transition"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="h-[200px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg p-5 text-white flex flex-col justify-center hover:scale-105 transition">
            <p className="text-sm opacity-90">Total Users</p>
            <h2 className="text-3xl font-bold mt-2">1,245</h2>
          </div>

          <div className="h-[200px] bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-lg p-5 text-white flex flex-col justify-center hover:scale-105 transition">
            <p className="text-sm opacity-90">Active Sessions</p>
            <h2 className="text-3xl font-bold mt-2">312</h2>
          </div>

          <div className="h-[200px] bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg p-5 text-white flex flex-col justify-center hover:scale-105 transition">
            <p className="text-sm opacity-90">Revenue</p>
            <h2 className="text-3xl font-bold mt-2">₹78,540</h2>
          </div>

          <div className="h-[200px] bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl shadow-lg p-5 text-white flex flex-col justify-center hover:scale-105 transition">
            <p className="text-sm opacity-90">Pending Tasks</p>
            <h2 className="text-3xl font-bold mt-2">18</h2>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="mt-8 h-[200px] bg-white/90 backdrop-blur rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="hover:text-green-600 transition">✅ User John logged in</li>
            <li className="hover:text-indigo-600 transition">📦 New order created</li>
            <li className="hover:text-purple-600 transition">🔄 Password changed</li>
            <li className="hover:text-pink-600 transition">📝 Profile updated</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
