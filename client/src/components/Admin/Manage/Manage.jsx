import { toast, Toaster } from "sonner";
import { lazy, startTransition, useEffect, useRef, useState } from "react";
import Register from "../Register/Register";
import "./manage.css";
import axios from "axios";

// Lazy load the EmployeeDetails component
const EmployeeDetails = lazy(() => import("../EmployeeDetails"));

function Manage() {
  const dialogRef = useRef();
  const [detail, setDetail] = useState([]);

  const getData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const response = await axios.get("/api/v1/admin/getUsers", config);
    const data = response.data.data;
    setDetail(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-900 text-white p-8 from-gray-900 to-gray-800 shadow-md rounded-xl">
      <Toaster position="top-right" richColors closeButton expand={true} />
      <button
        onClick={() => dialogRef.current.showModal()}
        className="flex-1 rounded-full bg-blue-600 hover:bg-blue-800 text-white antialiased font-bold px-4 py-2 transition duration-300 ease-in-out"
      >
        Add Employee
      </button>
      <dialog
        ref={dialogRef}
        autoFocus
        className="transition-all rounded-lg p-3 min-w-[80vw] max-w-[90vw] w-full bg-gray-800 text-white"
      >
        <button
          className="absolute right-2 top-1 hover:font-bold"
          onClick={() => dialogRef.current.close()}
        >
          Close
        </button>
        <Register />
      </dialog>
      <br />
      <br />
      <ShowTable detail={detail} />
    </div>
  );
}

function ShowTable({ detail }) {
  return (
    <div className="w-full text-white border p-6 text-lg rounded-lg bg-gray-800">
      <div className="hidden md:grid grid-cols-4 gap-4 text-center font-bold">
        <h1>First Name</h1>
        <h1>Last Name</h1>
        <h1>Email</h1>
        <h1>Modify / Delete</h1>
      </div>
      <div>
        <ShowTableData DataObject={detail} />
      </div>
    </div>
  );
}

function ShowTableData({ DataObject }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deleteEmail, setDeleteEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const deleteEmployeeRef = useRef();

  const deleteEmployee = async (email) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const body = { email };

    try {
      const response = await axios.delete(
        "/api/v1/admin/deleteUser",
        { data: body },
        config
      );

      if (response.data.success) {
        toast.success("Employee Deleted Successfully");
        getData();
      }
    } catch (error) {
      toast.error("Error deleting employee");
    }
  };

  const handleDelete = (email) => {
    setCurrentEmail(email);
    deleteEmployeeRef.current.showModal();
  };

  const confirmDelete = () => {
    if (deleteEmail === currentEmail) {
      deleteEmployee(currentEmail);
      deleteEmployeeRef.current.close();
    } else {
      toast.error("Emails do not match. Deletion canceled.");
    }
  };

  return (
    <div className="text-white">
      {DataObject.map((data, i) => (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 my-2 border-b border-gray-700 flex flex-col sm:flex-row bg-gray-900"
          key={i}
        >
          <div className="md:hidden font-bold">First Name</div>
          <h2 className="truncate">{data.firstName}</h2>
          <div className="md:hidden font-bold">Last Name</div>
          <h2>{data.lastName}</h2>
          <div className="md:hidden font-bold">Email</div>
          <h2 className="truncate">{data.email}</h2>
          <div className="md:hidden font-bold">Modify / Delete</div>
          <div className="flex gap-2">
            <button
              onClick={() => handleDelete(data.email)}
              className="hover:bg-red-600 bg-red-200 text-black w-24 p-2 rounded-xl transition duration-300 ease-in-out"
            >
              Delete
            </button>
            <button
              onClick={() => {
                startTransition(() => {
                  setSelectedEmployee(data);
                });
              }}
              className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-xl transition duration-300 ease-in-out hover:text-black"
            >
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
                className="lucide lucide-ellipsis-vertical"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
          </div>

          {selectedEmployee && selectedEmployee._id === data._id && (
            <dialog open={true} className="relative z-10 -translate-y-96">
              <EmployeeDetails
                details={selectedEmployee}
                empRef={deleteEmployeeRef}
              />
              <button
                onClick={() => {
                  startTransition(() => {
                    setSelectedEmployee(null);
                  });
                }}
                className="text-white absolute top-3 right-6"
              >
                Close
              </button>
            </dialog>
          )}
        </div>
      ))}
      <dialog
        ref={deleteEmployeeRef}
        className="relative z-10 p-5 rounded-lg bg-gray-800 text-white"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
        <p>Enter the employee's email to confirm deletion:</p>
        <input
          type="email"
          value={deleteEmail}
          onChange={(e) => setDeleteEmail(e.target.value)}
          className="border p-2 rounded w-full mb-4 bg-gray-700 text-white"
        />
        <div className="flex justify-end">
          <button
            onClick={confirmDelete}
            className="bg-red-600 text-white px-4 py-2 rounded mr-2"
          >
            Confirm
          </button>
          <button
            onClick={() => deleteEmployeeRef.current.close()}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default Manage;
