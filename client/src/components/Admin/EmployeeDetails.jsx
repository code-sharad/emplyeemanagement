import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import convertToSimpleDate from "./TimeSetting/SetDate";

function EmployeeDetails({ details, empRef }) {
  const [screenShots, setScreenShots] = useState([]);
  const [dailyReports, setDailyReports] = useState([]);
  const [isMessageBoxVisible, setIsMessageBoxVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      toast.error("Message cannot be empty");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const email = details.email;
      console.log("email of employee", email);

      const body = { message, email };

      console.log("messssssssssssssssssssssss", message, email);

      const response = await axios.post(
        "https://emplyeemanagement-nvmn.onrender.com/api/v1/admin/sendNotice",
        body,
        config
      );

      if (response.data.success) {
        toast.success("Message sent successfully");
        setMessage("");
        setIsMessageBoxVisible(false);
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Error sending message");
    }
  };

  const handleCancel = () => {
    setIsMessageBoxVisible(false);
    setMessage("");
  };

  useEffect(() => {
    console.log("Employee details: ", details);

    const url = `https://emplyeemanagement-nvmn.onrender.com/api/v1/admin/getSnapshot`;

    axios
      .post(
        url,
        { email: details.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const data = res.data.data;

        setDailyReports(details.dailyReports);
        console.log("daily reports => ", details.dailyReports);

        if (data) {
          setScreenShots(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-black min-h-screen rounded-lg overflow-hidden relative ">
      <div className="bg-gray-800 min-h-screen  text-white rounded-3xl backdrop-blur-lg border border-black p-4 mx-auto w-full lg:w-[900px] ">
        <Toaster position="top-right" richColors closeButton expand={true} />

        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center relative">
          {/* <img
            className="rounded-lg"
            src="https://avatars.githubusercontent.com/u/61672294?v=4"
            width={96}
          /> */}

          <div className="flex flex-col gap-2">
            <h2 className="capitalize">
              {/* {details.firstName} {details.lastName} */}
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {/* <span>{details.email}</span>
                <span>{details.phoneNumber}</span> */}

                <div className="bg-black h-auto w-full rounded-lg overflow-hidden pt-32  ">
                  <div className="bg-black/80 min-h-screen relative text-white rounded-3xl backdrop-blur-lg border border-black p-4  mx-auto w-full lg:w-[800px]">
                    {/* 
                  <button onClick={() => empRef.current.close()} className='text-white absolute top-3 right-3'>
                    Close
                  </button> */}

                    <div className="flex gap-20 justify-center items-center">
                      {/* <img className='rounded-lg' src='https://avatars.githubusercontent.com/u/61672294?v=4' width={96} /> */}

                      <div className=" w-44 h-44 bg-gray-200 text-black pt-16 rounded-lg text-center border">
                        <span className="capitalize text-5xl">
                          {details.firstName[0]}
                        </span>
                        <span className="capitalize text-5xl">
                          {details.lastName[0]}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h2 className="capitalize">
                          {details.firstName} {details.lastName}
                        </h2>

                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-4">
                            <span>{details.email} </span>
                            <span>{details.phoneNumber}</span>
                          </div>

                          <div className="flex flex-wrap gap-2 align-center">
                            <span className="border border-white rounded-full p-1 px-4 bg-black">
                              {details.isActive ? "Active 🟩" : "UnActive 🟥"}
                            </span>
                            <span className="border border-white bg-black rounded-full p-1 px-4">
                              {details.role}
                            </span>

                            <div>
                              <span className="border border-white bg-black rounded-full p-1 px-4">
                                <button
                                  onClick={() => setIsMessageBoxVisible(true)}
                                >
                                  Send Message
                                </button>
                              </span>

                              {isMessageBoxVisible && (
                                <div className="fixed inset-0 flex items-top justify-center bg-black bg-opacity-50  ">
                                  <div className="bg-black p-4 border border-gray-300 rounded w-96 max-h-80 overflow-x-auto ">
                                    <textarea
                                      value={message}
                                      onChange={(e) =>
                                        setMessage(e.target.value)
                                      }
                                      className="w-full p-2 border rounded text-black"
                                      rows="4"
                                      placeholder="Write your message here..."
                                    ></textarea>
                                    <div className="mt-2 flex justify-end">
                                      <button
                                        onClick={handleSendMessage}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                      >
                                        Send
                                      </button>
                                      <button
                                        onClick={handleCancel}
                                        className="bg-gray-300 text-black px-4 py-2 rounded"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12">
                      <h3 className="text-2xl my-6 text-center">ScreenShots</h3>
                      <div className="flex flex-wrap gap-4 min-h-[300px] justify-center border border-gray-800 rounded-xl p-4">
                        {screenShots.length !== 0 ? (
                          screenShots.map((screenshot, i) => (
                            <div
                              key={i}
                              className="shadow-lg  p-4 w-[18rem] flex flex-col items-center shadow-gray-400 rounded-xl bg-gray-900"
                            >
                              <h1>{screenshot.email}</h1>
                              <h2>{convertToSimpleDate(screenshot.time)}</h2>
                              <img
                                width={250}
                                src={screenshot.screenShot.secure_url}
                                alt="screenshot"
                                className="rounded-lg mt-2"
                              />
                            </div>
                          ))
                        ) : (
                          <h1 className="text-xl mt-12">No ScreenShots</h1>
                        )}
                      </div>

                      <h3 className="text-2xl my-12 text-center">Activities</h3>
                    </div>

                    <div className="mt-12">
                      <h3 className="text-2xl my-6 text-center">
                        Daily Reports
                      </h3>
                      <div className="flex flex-col gap-4 items-center">
                        {dailyReports.map((report, i) => (
                          <div
                            key={i}
                            className="shadow-sm p-6 shadow-gray-400 rounded-lg bg-gray-900 w-full lg:w-[700px]"
                          >
                            <h1>{report.projectName}</h1>
                            <h2>{report.workUrl}</h2>
                            <h2>{convertToSimpleDate(report.time)}</h2>
                            <li className="text-xl flex flex-wrap p-3 rounded-lg">
                              {report.report}
                            </li>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
