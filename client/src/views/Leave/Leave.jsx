import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

function Leave() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [fullName, setFullName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  const handleLeave = async (e) => {
    e.preventDefault();
    console.log("Submit");

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    setFullName(firstName + " " + lastName);
    console.log("fullllll", fullName);

    const data = {
      fullName: fullName,
      email: email,
      startDate: startDate,
      endDate: endDate,
      position: position,
      reason: reason,
    };

    const response = await axios.post(
      "https://emplyeemanagement-nvmn.onrender.com/api/v1/user/leaveApplication",
      data,
      config
    );

    console.log(response);

    alert(response.data.message);
  };

  return (
    <div className="flex flex-col rounded-lg items-center shadow-lg shadow-blue-100 m-8 p-8  ">
      <form
        className="space-y-8 w-full md:w-[90%] p-4 flex flex-col bg-gray-300 rounded-lg shadow-md"
        onSubmit={handleLeave}
      >
        <p className="font-semibold tracking-wide text-gray-700">
          <span className="font-bold">Tip:</span> Please provide all information
          to relate the leave application
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          {/* First name input field */}
          <div className="w-full md:w-1/2">
            <label
              className="block font-semibold text-gray-700"
              htmlFor="FirstName"
            >
              First Name
            </label>
            <input
              className="w-full border border-gray-300 outline-none shadow-inner bg-gray-50 rounded-lg placeholder-gray-500 text-sm p-3 mt-1 focus:ring-2 focus:ring-indigo-500"
              id="FirstName"
              type="text"
              name="fullName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last name input field */}
          <div className="w-full md:w-1/2">
            <label
              className="block font-semibold text-gray-700"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="w-full border border-gray-300 outline-none shadow-inner bg-gray-50 rounded-lg placeholder-gray-500 text-sm p-3 mt-1 focus:ring-2 focus:ring-indigo-500"
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email input field */}
        <div className="w-full md:w-[70%]">
          <label className="block font-semibold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border border-gray-300 outline-none shadow-inner bg-gray-50 rounded-lg placeholder-gray-500 text-sm p-3 mt-1 focus:ring-2 focus:ring-indigo-500"
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Start date input field */}
          <div className="w-full md:w-1/2">
            <label
              className="block font-semibold text-gray-700"
              htmlFor="startDate"
            >
              Start of Leave
            </label>
            <input
              className="w-full border border-gray-300 outline-none shadow-inner bg-gray-50 rounded-lg placeholder-gray-500 text-sm p-3 mt-1 focus:ring-2 focus:ring-indigo-500"
              id="startDate"
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* End date input field */}
          <div className="w-full md:w-1/2">
            <label
              className="block font-semibold text-gray-700"
              htmlFor="endDate"
            >
              End of Leave
            </label>
            <input
              className="w-full border border-gray-300 outline-none shadow-inner bg-gray-50 rounded-lg placeholder-gray-500 text-sm p-3 mt-1 focus:ring-2 focus:ring-indigo-500"
              id="endDate"
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Position input field */}
        <div className="w-full md:w-[70%]">
          <label
            className="block font-semibold text-gray-700"
            htmlFor="position"
          >
            Position
          </label>
          <input
            className="w-full border border-gray-300 outline-none shadow-inner bg-gray-50 rounded-lg placeholder-gray-500 text-sm p-3 mt-1 focus:ring-2 focus:ring-indigo-500"
            id="position"
            type="text"
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>

        {/* Explain About leave reason input field */}
        <div>
          <label
            className="block font-semibold text-gray-700"
            htmlFor="description"
          >
            Explain About Leave Reason
          </label>
          <textarea
            className="w-full border border-gray-300 outline-none shadow-inner bg-gray-50 rounded-lg placeholder-gray-500 text-sm p-3 mt-1 focus:ring-2 focus:ring-indigo-500"
            id="description"
            name="description"
            rows="5"
            placeholder="Explain about leave reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-center mt-8">
          <button
            type="submit"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Leave;
