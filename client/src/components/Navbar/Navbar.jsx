import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Navbar({ userType, setUserType }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAdminUrl = location.pathname.includes("admin-dashboard");

  const handleLogout = async (e) => {
    console.log("lllllllllllllll", userType);
    // Clear user data
    setUserType(null);
    localStorage.removeItem("userType"); // If you're using localStorage or sessionStorage
    sessionStorage.removeItem("userType"); // Clear session storage if used

    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: localStorage.getItem("employeeDashboardTimer") ,
    };

    const response = await axios.post(
      "http://localhost:5200/api/v1/user/logout",
      config,
    );

    console.log(response);

    const data = response.data;

    console.log(data);

    if (response.status === 200) {
      // alert(data.message);

      toast.success(data.message);

      navigate("/", { replace: true });
      toast.success(" Logged Out Successfully");
    }
  };

  const handleAdminLogout = async (e) => {
    // Clear user data
    setUserType(null);
    localStorage.removeItem("token"); // If you're using localStorage or sessionStorage
    sessionStorage.removeItem("userType"); // Clear session storage if used
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const response = await axios.post(
      "http://localhost:5200/api/v1/admin/logout",
      config
    );
    localStorage.removeItem("admin");
    document.cookie =
      "admintoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    console.log(response);

    const data = response.data;

    console.log(data);

    if (response.status === 200) {
      // alert(data.message);

      toast.success(data.message);

      toast.success("logged out");

      navigate("/", { replace: true });
    }
  };

  const MobileNav = () => {
    return (
      <nav>
        {location.pathname === "/" ? (
          <div className="min-h-12  ">
            <Link to={"/"} className=" text-2xl ml-4">
              EMS
            </Link>
            {isOpen ? (
              <div
                className="absolute right-3 top-3 "
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-align-right"
                >
                  <line x1="21" x2="3" y1="6" y2="6" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                  <line x1="21" x2="7" y1="18" y2="18" />
                </svg>
              </div>
            ) : (
              <div className="h-full">
                <button
                  className="absolute right-3 top-3"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-x"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
                <nav className="mt-8 ml-4 gap-3 flex flex-col  items-end mr-12 text-xl mb-4">
                  <Link className="hover:underline " to="/emplogin">
                    Employee
                  </Link>
                  <Link className="hover:underline " to="/adminlogin">
                    Admin
                  </Link>
                </nav>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </nav>
    );
  };

  return (
    <div className="z-[100]  sticky top-0">
      <motion.nav
        initial={{ translateY: "-100px", opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        animate={{ translateY: "0px", opacity: 1 }}
        className="bg-violet-100/50  backdrop-blur-lg shadow-md absolute right-0 left-0 top-0 z-[100] "
      >
        {isMobile ? (
          <MobileNav />
        ) : (
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Link to="/" className="text-2xl font-light">
                  EMS
                </Link>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {location.pathname === "/" && (
                      <Link
                        to="/emplogin"
                        className={`
    inline-flex items-center px-4 py-2  rounded-lg  border border-black font-medium transition-all duration-200 ease-in-out
    ${location.pathname === "/" ? "" : ""}
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  `}
                      >
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        Employee
                      </Link>
                    )}
                    {location.pathname === "/" && (
                      <Link
                        to="/adminlogin"
                        className={`px-3 py-2 rounded-md  font-medium ${
                          location.pathname === "/"
                            ? "bg-blue-500 text-white font-poppins"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Admin
                      </Link>
                    )}
                    {(location.pathname.includes("admin") ||
                      location.pathname.includes("emp")) && (
                      <>
                        <Link
                          to={`/${isAdminUrl ? "admin" : "emp"}-dashboard`}
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname.includes("dashboard")
                              ? "bg-blue-500 text-white"
                              : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Dashboard
                        </Link>

                        <Link
                          to="/about"
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/"
                              ? "bg-blue-500 text-white"
                              : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          About
                        </Link>
                        <button
                          onClick={
                            location.pathname.includes("admin")
                              ? handleAdminLogout
                              : handleLogout
                          }
                          to="/logout"
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === "/logout"
                              ? "bg-blue-500 text-white"
                              : `text-gray-700 hover:bg-gray-200`
                          }`}
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </div>
  );
}

export default Navbar;
