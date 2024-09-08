import { useEffect, useState } from "react";
import axios from "axios";

function History() {
  const [allLeaves, setAllLeaves] = useState([]);
  const getAllLeaves = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const response = await axios.get("/api/v1/admin/getAllLeaves", config);
    console.log(response.data.data);
    setAllLeaves(response.data.data);
  };

  useEffect(() => {
    getAllLeaves();
  }, []);

  function convertToSimpleDate(isoDateString) {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  return (
    <div>
      <h1 className="text-center dark dark:bg-black dark:text-white border-b-2 border-black my-12 text-3xl">
        History
      </h1>
      <div>
        {allLeaves.map((employeeRecord, i) => {
          return (
            <div
              key={i}
              className="bg-white dark:bg-black dark:text-white flex shadow-lg xsm:flex-col sm:flex-col rounded-2xl  align-center md:flex-row  shadow-gray-400 p-4 m-8 "
            >
              {/*****  leave details  *****/}
              <div>
                <div className="mb-6 dark:bg-black dark:text-white">
                  <h3 className="text-xl font-bold capitalize border-b-2 border-black">
                    {employeeRecord.fullName}
                  </h3>
                  <h4 className="text-sm my-2">{employeeRecord.email}</h4>
                  <p className="text-lg">{employeeRecord.reason}</p>
                </div>

                {/*****    
                                <section className='dark:bg-black dark:text-white p-4 w-full'>
                                    <p>{employeeRecord.description || 'no description provided'}</p>
                                </section>
                            *****/}
              </div>

              {/*****  leave dates  *****/}
              <section className="m-4 ml-10">
                <button className=" bg-pink-100 text-center py-2 px-4 font-semibold rounded-2xl ">
                  {convertToSimpleDate(employeeRecord.startDate)}
                </button>

                <button className="m-4 bg-pink-200 text-center py-2 px-4 font-semibold rounded-2xl ">
                  {convertToSimpleDate(employeeRecord.endDate)}
                </button>
              </section>

              {/*****  leave status  *****/}
              <div className="m-8">
                <button
                  className={`

                                    text-center py-2 px-4 font-semibold rounded-2xl 
                                    ${
                                      employeeRecord.leaveStatus === "approved"
                                        ? "bg-green-500 "
                                        : employeeRecord.leaveStatus ===
                                          "pending"
                                        ? "bg-yellow-300"
                                        : "bg-red-500"
                                    }`}
                >
                  {employeeRecord.leaveStatus}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
