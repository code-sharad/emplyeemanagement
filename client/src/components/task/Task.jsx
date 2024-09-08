import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function Task() {
  return (
    <div>
      <div className="md-flex md-flex-column md-align-items-center shadow-lg rounded-lg p-8 shadow-gray-400  ">
        <Link to="/AddTask">
          <div className=" text-lg rounded border hover:bg-gray-100 border-black p-3 text-center ">
            Add Task
          </div>
        </Link>
      </div>
    </div>
  );
}

export const AddTask = ({ setTasks, tasks, dialogRef }) => {
  const [task, setTask] = useState({
    projectname: "",
    tasktitle: "",
    department: "",
    description: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const body = {
      project: task.projectname,
      title: task.tasktitle,
      department: task.department,
      description: task.description,
    };

    const response = await axios.post(
      "https://emplyeemanagement-nvmn.onrender.com/api/v1/user/addTask",
      body,
      config
    );

    console.log(response);
    const data = response.data;
    console.log(data);

    if (data.success) {
      alert(data.message);
      await toast.success("Task added successfully");
    }
  };

  return (
    <div className="md-flex md-flex-column md-align-items-center m-8 p-8 bg-gradient-to-r from-blue-400 to-purple-400 ">
      <form onSubmit={handleSubmit}>
        {/* project name input field */}
        <div>
          <label className="block font-semibold" htmlFor="FirstName">
            Project Name
          </label>
          <input
            className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
            id="FirstName"
            type="text"
            onChange={(e) => setTask({ ...task, projectname: e.target.value })}
            value={task.projectname}
            name="ProjectName"
            required
          />
        </div>

        {/* task name input field */}
        <div>
          <label className="block font-semibold" htmlFor="lastName">
            Task Title
          </label>
          <input
            className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
            onChange={(e) => setTask({ ...task, tasktitle: e.target.value })}
            value={task.tasktitle}
            id="lastName"
            type="text"
            name="lastName"
            required
          />
        </div>

        {/* Position input field */}
        <div className="mt-4">
          <label className="block font-semibold" htmlFor="email">
            Position
          </label>
          <input
            className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 "
            onChange={(e) => setTask({ ...task, department: e.target.value })}
            value={task.department}
            id="email"
            type="text"
            name="email"
            required
          />
        </div>

        {/* project description input field */}
        <div className="mt-4">
          <label className="block font-semibold" htmlFor="phoneNumber">
            Description
          </label>
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 "
            value={task.description}
            id="phoneNumber"
            type="text"
            name="Description"
            required
          ></textarea>
        </div>

        {/* Submit button */}
        <div className="flex items-center justify-between mt-8">
          <button
            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            onSubmit={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Task;
