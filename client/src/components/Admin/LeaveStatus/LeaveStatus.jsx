import axios from "axios";
import { useEffect, useState } from "react";

function LeaveStatus() {
  const [check, setCheck] = useState([{}]);

  const getLeaveRequest = async () => {
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

    console.log(response.data);

    const data = response.data;
    console.log(data.data);

    const check = data.data;

    setCheck(check, data.i);

    // check.map((i, data) => {

    //   console.log(data);
    //   console.log(i.fullName);
    // })
  };

  useEffect(() => {
    getLeaveRequest();
  }, []);

  return (
    <div className="border">
      <table className="min-w-full divide-y divide-x border border-black divide-gray-200 rounded-xl shadow">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {check &&
            check.map((i) => {
              console.log("JSX Component =>  " + i.fullName);

              <tr key={10}>
                <td>i.fullName</td>
                <td>i.email</td>
                <td>i.reason</td>
                <td>i.date</td>

                <td className="flex items-center justify-around">
                  <button className="border border-black hover:bg-green-600 hover:text-white px-4 rounded-lg ">
                    {" "}
                    approve{" "}
                  </button>
                  <button className="border border-black hover:bg-red-700 hover:text-white px-4 rounded-lg ">
                    {" "}
                    deny{" "}
                  </button>
                </td>
              </tr>;
            })}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveStatus;
