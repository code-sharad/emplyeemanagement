import axios from "axios";
import { useEffect, useState } from "react";
import convertToSimpleDate from "../TimeSetting/SetDate";

function AdminProfiles() {
  const [admin, setAdmin] = useState({
    firstName: "Gaurav",
    lastName: "Ghuge",
    email: "GauravGhuge@gmail.com",
    phoneNumber: "9947834732",
    _id: "2323",
  });

  const getAdminProfile = async () => {
    const config = {
      headers: {
        content: "application/json",
      },

      withCredentials: true,
    };

    const response = await axios.get("/api/v1/admin/getAdminProfile", config);

    const data = response.data.data;

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);

    setAdmin(data);
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

  return (
    <div className="lg:w-[70vw] dark dark:bg-gray-900 dark:text-white md:w-[80vw] bg-slate-300  mx-auto shadow-lg shadow-gray-500 dark:shadow-gray-800 border p-4 rounded-3xl lg:p-9 py-16 m-8">
      {/*******  profile information section photo, email, phoneNumber  */}
      <div className="flex items-center gap-24 md:flex-row xsm:flex-col sm:flex-col mb-8">
        {/* profile photo */}
        <div className="mr-4">
          <img
            src="https://randomuser.me/api/portraits/women/21.jpg"
            className="rounded-full h-32 w-32 shadow-2xl shadow-yellow-100"
            alt="Admin Avatar"
          />

          <p className="text-gray-500 text-center dark:text-gray-400">Admin</p>
        </div>

        {/* profile information */}
        <div className="flex flex-col  gap-2">
          {/***  first name, last name  */}
          <section className="flex font-mono">
            <h1 className="text-3xl font-bold">
              {admin.firstName.toUpperCase()}&nbsp;
            </h1>
            <h1 className="text-3xl font-bold">
              {admin.lastName.toUpperCase()}
            </h1>
          </section>

          {/***  email, id  */}
          <section className="text-black dark:text-white">
            <h1 className="text-xl dark:text-white text-gray-900 font-[400] ">
              {admin.email}
            </h1>
          </section>

          {/***  phone number  */}
          <section className="dark:text-gray-400">
            <h1 className="text-xl dark:text-white text-gray-900 font-[400] ">
              {admin.phoneNumber ? admin.phoneNumber : "8767482793"}
            </h1>
          </section>

          {/***  id  */}
          <section className="">
            <h1 className="text-xl text-black font-[400] dark:text-white">
              Id : {admin._id}
            </h1>
          </section>

          <section className="">
            <h1 className="text-xl text-black font-[400] dark:text-white">
              From : {admin.createdAt}
            </h1>
          </section>
        </div>
      </div>

      <div className="">
        <h2 className="text-xl text-center font-bold mb-4">
          Role and Permissions
        </h2>

        <div className="flex md:flex-row flex-col gap-24 justify-center">
          <div className="flex items-center">
            <div className="mr-2 text-gray-500 dark:text-gray-400" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="lucide lucide-user-round"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 0 0-16 0" />
            </svg>
            <span className="mx-3">Admin</span>
          </div>

          <div className="flex items-center">
            <div className="mr-2 text-gray-500 dark:text-gray-400" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lock"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="mx-3">
              Full access to all employee data and management tools
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfiles;
