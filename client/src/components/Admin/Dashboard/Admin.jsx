import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

import Notifications from "../../../views/Notifications/Notifications";
import Report from "../../../views/Report/Report";

import axios from "axios";
import AdminProfiles from "../AdminProfile/AdminProfiles";
import { toast } from "sonner";
import LeaveStatus from "../LeaveStatus/LeaveStatus";
import Announcement from "../../../views/Announcement/Announcement";
import History from "../../../views/History/History";
import Manage from "../Manage/Manage";

function Admin() {
  const theme = localStorage.getItem("theme");
  const [activeBox, setActiveBox] = useState("");
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [leaveRequest, setLeaveRequest] = useState(0);
  const [acceptLeave, setAcceptLeave] = useState(0);

  let count = 0;

  const [activeUsers, setActiveUsers] = useState(0);

  const getEmployee = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      withCredentials: true,
    };

    try {
      const response = await axios("/api/v1/admin/getUsers", config);

      const data = response.data;

      // set the total emplyees
      setTotalEmployee(data.data.length);

      console.log(data.data);

      const info = data.data;

      info.map((e) => {
        if (e.isActive) {
          count++;
        }
      });

      setActiveUsers(count);
    } catch (error) {
      console.log(error);
    }
  };

  const getLeaveRequest = async () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },

      withCredentials: true,
    };

    try {
      const response = await axios.get(
        "/api/v1/admin/getLeaveEmployee",
        config
      );

      console.log(response.data);

      const data = response.data;

      const check = data.data;

      let approved = 0;
      let request = 0;

      await check.map((e) => {
        if (e.leaveStatus === "approved") {
          approved++;
        }
      });
      await check.map((e) => {
        if (e.leaveStatus === "pending") {
          request++;
        }
      });

      setLeaveRequest(request);

      setAcceptLeave(approved);
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  useEffect(() => {
    getEmployee();
  });

  useEffect(() => {
    getLeaveRequest();
  }, [leaveRequest]);

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900 border-gray-700"
          : "bg-gray-50 border-gray-200"
      } min-h-screen  dark:bg-black from-slate-100 to-slate-600 bg-gray-50/50`}
    >
      <div className="p-4 xl:ml-80">
        <Sidebar activeBox={activeBox} setActiveBox={setActiveBox} />

        <div className="mt-12">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {/* total Employee block */}

            <div className="relative dark:bg-gray-900 dark:text-white flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                >
                  <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                  <path
                    fillRule="evenodd"
                    d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                    clipRule="evenodd"
                  />
                  <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                </svg>
              </div>

              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-lg font-semibold leading-normal  text-blue-gray-600">
                  Total Employee
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {totalEmployee}
                </h4>
              </div>

              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">+10%</strong> grow the
                  working
                </p>
              </div>
            </div>

            {/* active Employees */}

            <div className="relative dark:bg-gray-900 dark:text-white flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-lg leading-normal font-semibold text-blue-gray-600">
                  Active Users
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {activeUsers}
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">+3%</strong> grow the
                  Active Network
                </p>
              </div>
            </div>

            {/* Leave request Employees */}

            <div className="relative dark:bg-gray-900 dark:text-white flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div
                className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center"
                onClick={() => setActiveBox("leave")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-lg leading-normal font-semibold text-blue-gray-600">
                  Leave Requests
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {leaveRequest}
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-red-500">-2%</strong>&nbsp;than
                  yesterday
                </p>
              </div>
            </div>

            {/** the leave employees */}
            <div className="relative dark:bg-gray-900 dark:text-white flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                >
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                </svg>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-lg leading-normal font-semibold text-blue-gray-600">
                  Today Leave
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {acceptLeave}
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500"> </strong> &nbsp; Urgent
                  leaving applications
                </p>
              </div>
            </div>
          </div>

          <div>
            {activeBox === "profile" && <AdminProfiles />}

            {activeBox === "manage" && <Manage className="my-16" />}
            {activeBox === "notifications" && <Notifications />}
            {activeBox === "report" && <Report />}

            {activeBox === "" && <Manage />}

            {activeBox === "leave" && <LeaveStatus />}
            {activeBox === "announcement" && <Announcement />}
            {activeBox === "history" && <History />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
