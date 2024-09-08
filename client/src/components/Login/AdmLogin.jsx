import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import adminloginImg from "../../../public/sigupadmin.png";

function AdmLogin({ loginType }) {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const navigate = useNavigate();

  const submitAdmin = async (e) => {
    e.preventDefault();
    console.log("Admin Email:", adminEmail);
    console.log("Admin Password:", adminPassword);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const body = {
      email: adminEmail,
      password: adminPassword,
      adminId: adminId,
    };

    try {
      const response = await axios.post(
        "https://emplyeemanagement-nvmn.onrender.com/api/v1/admin/login",
        body,
        config
      );

      console.log(response);

      const data = response.data;

      console.log(data);

      if (data.success === true) {
        toast.success("Admin Login Successful");

        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Admin Login Failed. Please try again.");
    }
  };

  return (
    <div className="grid shadow-2xl translate-y-24 border max-w-[900px] mx-auto grid-cols-1 lg:grid-cols-2">
      {/* Admin Login Card */}

      <img
        className="hidden lg:block md:col-span-1  object-cover"
        src="./adminlogin.png"
      />
      <div className="col-span-2 lg:col-span-1 p-6  ">
        <div className="col-span-2 lg:col-span-1 p-6 relative  bg-white/60  backdrop-blur-3xl ">
          <div className="-z-[2] right-0 absolute -bottom-10  overflow-hidden h-[500px] w-[600px] blur-[90px] rounded-[100%] bg-gradient-to-bl from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-800 dark:blur-[240px] dark:animate-none"></div>
          <div className="-z-[4]  absolute right-0 bottom-0  overflow-hidden h-[500px] w-[600px] blur-[90px] rounded-[100%] bg-gradient-to-bl from-orange-100 to-purple-100 dark:from-orange-900 dark:to-purple-900 dark:blur-[240px] dark:animate-none"></div>

          <div className="w-full p-6   ">
            <h2 className="text-2xl font-light text-center mb-6">
              Admin Login
            </h2>
            <form onSubmit={submitAdmin} method="POST">
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black "
                />
                <label className="block text-gray-700 mt-3">Admin Id:</label>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="w-full decoration px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  "
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-black "
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Login
              </button>
              <h4 className="text-center mt-2 font-medium text-xl ">Or</h4>
              <div className="mt-4 text-center">
                <Link to="/sign-up" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmLogin;
