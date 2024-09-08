import { useState, useEffect } from "react";
import "./Notification.css"; // Import CSS for styling
import axios from "axios";
import convertToSimpleDate from "../../components/Admin/TimeSetting/SetDate";
import { Toaster, toast } from "sonner";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fetch notifications from an API (placeholder function)
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    // Placeholder data, replace with API call

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

    console.log(response);

    const info = response.data.data;

    console.log(info);

    // info.map((item, i) => {
    //   console.log(item);

    // })

    const data = info;

    const check = data.filter((item) => item.leaveStatus === "pending");
    console.log(check.length);
    setCount(check.length);
    setNotifications(data);
  };

  const setApproveLeave = async (email, reason) => {
    alert("Do you want to approve this leave?");
    toast.success("Leave Approved");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const body = {
      email: email,
      leaveStatus: "approved",
      reason: reason,
    };

    const response = await axios.post(
      "https://emplyeemanagement-nvmn.onrender.com/api/v1/admin/approveLeave",
      body,
      config
    );

    console.log(response);

    fetchNotifications();
  };

  const setRejectLeave = async (email, reason) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const body = {
      email: email,
      leaveStatus: "rejected",
      reason: reason,
    };

    const response = await axios.post(
      "https://emplyeemanagement-nvmn.onrender.com/api/v1/admin/approveLeave",
      body,
      config
    );

    console.log(response);

    fetchNotifications();
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  console.log(notifications);

  return (
    <div className="dark dark:bg-black dark:text-white notification-container  relative">
      <Toaster />
      <div className="flex flex-col lg:flex-row justify-between">
        <h2 className="font-bold text-2xl">Admin Notifications</h2>
        <button className=" right-2 top-2" onClick={clearAllNotifications}>
          Clear All Notifications
        </button>
      </div>
      <ul className="mt-4">
        {notifications.map(
          (notification, i) =>
            notification.leaveStatus !== "approved" &&
            notification.leaveStatus !== "rejected" && (
              <li className="dark:bg-black dark:text-white" key={i}>
                <h3>{notification.email}</h3>
                <p>{notification.reason}</p>
                <p>{notification.leaveStatus}</p>
                <span>{notification.date}</span>
                <div className="dark:bg-black dark:text-white">
                  {/* {!notification.isRead && <button onClick={() => markAsRead(notification.id)}>Mark as Read</button>} */}
                  <button
                    onClick={() =>
                      setApproveLeave(notification.email, notification.reason)
                    }
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      setRejectLeave(notification.email, notification.reason)
                    }
                  >
                    Reject
                  </button>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Notifications;
