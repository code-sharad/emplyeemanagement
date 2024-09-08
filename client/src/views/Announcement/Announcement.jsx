import { useState, useEffect } from "react";
import axios from "axios";
import convertToSimpleDate from "../../components/Admin/TimeSetting/SetDate";

function Announcement() {
  const [announcement, setAnnouncement] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();

    if (announcement.trim() === "") {
      setMessage("Announcement cannot be empty!");
      setMessageType("error");
      return;
    }

    console.log(announcement);

    const body = {
      announcement: announcement,
    };

    try {
      const response = await axios.post(
        "https://emplyeemanagement-nvmn.onrender.com/api/v1/admin/createAnnouncement",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data.data);

      console.log("Anouncement => ", response.data.data.announcement);

      if (response.data.success) {
        setAnnouncements([...announcements, response.data.data]);
        setAnnouncement("");
        setMessage("Announcement successfully created!");

        await fetchAnnouncements();
        setMessageType("success");
      } else {
        setMessage("Failed to create announcement. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      setMessage(
        "An error occurred while creating the announcement. Please try again."
      );
      setMessageType("error");
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.post(
        "https://emplyeemanagement-nvmn.onrender.com/api/v1/admin/getAnnouncements"
      );

      console.log("Fetched Announcements:", response.data);
      console.log("Fetched Announcements => ", response.data.data);

      if (response.data.success) {
        const announcementsData = response.data.data; // Assuming the announcements are in `data`

        console.log("announcementsData =>", announcementsData);

        const flattenedAnnouncements = announcementsData;

        setAnnouncements(flattenedAnnouncements);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="flex dark dark:bg-black dark:text-white flex-col items-center justify-center min-w-max max-w-full rounded-2xl bg-slate-100 min-h-screen">
      <div className="dark:bg-black dark:text-white bg-gray-300 shadow-md p-4 min-w-[44rem] rounded-lg m-10  max-w-full">
        <h2 className=" dark:text-white  text-2xl font-bold mb-4 text-gray-800">
          Declare A Announcement
        </h2>

        {message && (
          <div
            className={`mb-4 text-sm ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Enter your announcement"
            rows="4"
            className="w-full p-2 border rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create Announcement
          </button>
        </form>
      </div>

      <h2 className="text-2xl dark:bg-black dark:text-white mt-32 font-bold border-b-2 border-black  mb-4 text-gray-800">
        Recent Announcements
      </h2>

      <div className="mb-32  dark:bg-black dark:text-white shadow-lg shadow-gray-400 w-full max-w-[60rem] overflow-scroll h-[40rem] ">
        <ul className="space-y-4  ">
          {announcements.map((announce, index) => {
            return (
              <ul
                key={index}
                className="p-4 m-2 dark:bg-black dark:text-white bg-gray-200 rounded-xl shadow text-black "
              >
                <li className="p-4 bg-gray-200  text-black ">
                  {" "}
                  {announce.createdAt}{" "}
                </li>
                <li className="p-4 bg-gray-100  text-black  ">
                  {" "}
                  {announce.announcement}{" "}
                </li>
              </ul>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Announcement;
