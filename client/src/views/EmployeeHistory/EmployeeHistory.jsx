import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeHistory() {
  const [employeeHistory, setEmployeeHistory] = useState([]);

  useEffect(() => {
    getEmployeeHistory();
  }, []);

  const getEmployeeHistory = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(
        "https://emplyeemanagement-nvmn.onrender.com/api/v1/admin/getLeaveEmployee",
        config
      );
      console.log(response.data.data);
      setEmployeeHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching employee history:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-300">
      <h1 className="text-center my-6 text-3xl font-bold">Employee History</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {employeeHistory.map((employee, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 relative"
          >
            <h3 className="text-xl font-bold">{employee.fullName}</h3>
            <h4 className="text-sm text-gray-600">{employee.email}</h4>
            <p className="text-sm mt-2">{employee.reason}</p>
            <span
              className={`absolute bottom-2 right-2 py-1 px-2 rounded-lg font-bold ${
                employee.leaveStatus === "approved"
                  ? "bg-green-500 text-white"
                  : employee.leaveStatus === "pending"
                  ? "bg-yellow-300 text-gray-800"
                  : "bg-red-600 text-white"
              }`}
            >
              {employee.leaveStatus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeHistory;
