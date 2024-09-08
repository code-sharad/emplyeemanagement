import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function EmpProfile() {
  const [employee, setEmployee] = useState({
    firstName: "null",
    lastName: "null",
    email: "sharad.bhadait@asia.com",
    phoneNumber: "null",
    bio: "null",
    avatar: "null",
  });

  const [avatar, setAvatar] = useState(null);
  const [empBio, setEmpBio] = useState("enter your bio");

  // fetch user profile data
  const fetchProfile = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const response = await axios.get(
        "https://emplyeemanagement-nvmn.onrender.com/api/v1/user/getUserProfile",
        config
      );
      const data = response.data;
      console.log("BIO data", data.data);
      if (data.success) {
        toast.success(data.message);
        setEmployee(data.data);
        setAvatar(data.data.avatar.secure_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("phoneNumber", employee.phoneNumber);
    formData.append("bio", employee.bio);

    try {
      const response = await axios.post(
        "https://emplyeemanagement-nvmn.onrender.com/api/v1/user/updateProfile",
        formData,
        config
      );
      const data = response.data;

      if (data.success) {
        toast.success("profile updated");
        setEmployee(data.data);
        setEmpBio(data.data.bio);
        console.log("employee", employee);
        setAvatar(data.data.avatar.secure_url);
        toggleEditMode();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="my-20 mx-4 rounded-lg flex relative items-center justify-center p-6 sm:p-8 lg:p-10 shadow-md bg-gray-300 ">
        <br className="my-8" />

        {/**** this is the edit mode */}
        {isEditing ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-start employee-form w-full max-w-3xl mx-auto p-4  bg-gray-300 rounded-lg shadow-lg"
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10">
              <div className="flex-shrink-0">
                <label className="flex flex-col items-center">
                  Avatar:
                  <input
                    type="file"
                    className="mt-2 p-2 border border-gray-300 rounded-lg"
                    capture="camera"
                    name="avatar"
                    accept="*"
                    onChange={handleImageChange}
                  />
                  {avatar && avatar instanceof File ? (
                    <img
                      width={"120"}
                      height={"120"}
                      src={URL.createObjectURL(avatar)}
                      alt="Avatar"
                      className="mt-4 rounded-full shadow-md"
                    />
                  ) : (
                    avatar && (
                      <img
                        width={"120"}
                        height={"120"}
                        src={avatar}
                        alt="Avatar"
                        className="mt-4 rounded-full shadow-md"
                      />
                    )
                  )}
                </label>
              </div>
            </div>

            <label className="flex flex-col w-full">
              <span className="font-medium text-gray-700">Name:</span>
              <input
                readOnly={true}
                type="text"
                name="name"
                className="mt-1 p-3 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={employee.firstName}
                onChange={handleInputChange}
              />
            </label>

            {/******last Name field */}
            <label className="flex flex-col w-full">
              <span className="font-medium text-gray-700">Last Name:</span>
              <input
                readOnly={true}
                type="text"
                name="name"
                className="mt-1 p-3 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={employee.lastName}
                onChange={handleInputChange}
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="font-medium text-gray-700">Phone Number:</span>
              <input
                type="text"
                name="phoneNumber"
                className="mt-1 p-3 rounded-lg outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={employee.phoneNumber}
                onChange={handleInputChange}
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="font-medium text-gray-700">Email:</span>
              <input
                type="email"
                name="email"
                className="mt-1 p-3 rounded-lg outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={employee.email}
              />
            </label>

            <label className="flex flex-col w-full">
              <span className="font-medium text-gray-700">Bio:</span>
              <textarea
                name="bio"
                cols={"30"}
                rows={"4"}
                value={employee.bio}
                className="mt-1 p-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={handleInputChange}
              />
            </label>

            <div className="flex gap-4 mt-4">
              <button
                className="bg-blue-600 p-3 rounded-xl w-24 text-white font-medium hover:bg-blue-700 transition duration-300"
                type="submit"
              >
                Save
              </button>
              <button
                type="button"
                onClick={toggleEditMode}
                className="bg-red-600 p-3 w-24 rounded-xl text-white font-medium hover:bg-red-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="employee-details text-lg flex flex-col space-y-6 w-full ">
            {/**** this is the view mode */}

            {/**** Profile section  */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
              <div className="flex-shrink-0 px-10">
                {/**** Avatar section  */}
                <img
                  className="rounded-full h-28 w-28 border-2 lg:h-40 lg:w-40 border-black"
                  src={avatar}
                  width={"120"}
                  alt="Profile Image"
                />
              </div>

              <div className="flex flex-col lg:ml-6 lg:flex-1">
                {/**** Name section  */}
                <div className="flex gap-2 my-6">
                  <p className="text-4xl font-semibold font-playfair">
                    {" "}
                    {employee.firstName}
                  </p>
                  <p className="text-4xl font-semibold font-playfair">
                    {" "}
                    {employee.lastName}
                  </p>
                </div>

                <div className="my-3">
                  <p className="text-2xl"> {employee.phoneNumber}</p>
                </div>

                <div className="my-4">
                  <p className="text-2xl"> {employee.email}</p>
                </div>

                <div className="my-4">
                  <p className="text-2xl"> {employee.bio}</p>
                </div>
              </div>
            </div>

            <button
              onClick={toggleEditMode}
              className="absolute top-0 right-0 flex gap-2 items-center p-2 rounded-xl w-24 text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-pencil"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmpProfile;

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { toast } from "sonner";

// function EmpProfile() {
//   const [employee, setEmployee] = useState({
//     firstName: "null",
//     lastName: "null",
//     email: 'sharad.bhadait@asia.com',
//     phoneNumber: "null",
//     bio: "null",
//     avatar: "null",
//   });

//   const [avatar, setAvatar] = useState(null);

//   // fetch user profile data
//   const fetchProfile = async () => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//     };

//     try {
//       const response = await axios.get("https://emplyeemanagement-nvmn.onrender.com/api/v1/user/getUserProfile", config);
//       const data = response.data;

//       if (data.success) {
//         toast.success(data.message);
//         setEmployee(data.data);
//         setAvatar(data.data.avatar.secure_url);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const [isEditing, setIsEditing] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee({ ...employee, [name]: value });
//   };

//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const config = {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       withCredentials: true,
//     };

//     const formData = new FormData();
//     formData.append("avatar", avatar);
//     formData.append("phoneNumber", employee.phoneNumber);
//     formData.append("bio", employee.bio);

//     try {
//       const response = await axios.post("https://emplyeemanagement-nvmn.onrender.com/api/v1/user/updateProfile", formData, config);
//       const data = response.data;

//       if (data.success) {
//         alert(data.message);
//         setEmployee(data.data);
//         setAvatar(data.data.avatar.secure_url);
//         toggleEditMode();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleImageChange = (e) => {
//     setAvatar(e.target.files[0]);
//   };

//   return (
//     <div>
//       <div className="my-20 mx-4 rounded-lg flex relative items-center justify-center p-6 sm:p-8 lg:p-10 shadow-md bg-gray-300 ">
//         {isEditing ? (
//           <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-start employee-form w-full max-w-3xl mx-auto p-4 bg-gray-300 rounded-lg shadow-lg">
//             <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10">
//               <div className="flex-shrink-0">
//                 <label className="flex flex-col items-center">
//                   Avatar:
//                   <input type="file" className="mt-2 p-2 border border-gray-300 rounded-lg" capture="camera" name="avatar" accept="image/*" onChange={handleImageChange} />
//                   {avatar && <img width={'120'} height={'120'} src={avatar} alt="Avatar" className="mt-4 rounded-full shadow-md" />}
//                 </label>
//               </div>
//             </div>

//             <label className="flex flex-col w-full">
//               <span className="font-medium text-gray-700">Name:</span>
//               <input readOnly type="text" name="firstName" className="mt-1 p-3 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={employee.firstName} onChange={handleInputChange} />
//             </label>

//             <label className="flex flex-col w-full">
//               <span className="font-medium text-gray-700">Last Name:</span>
//               <input readOnly type="text" name="lastName" className="mt-1 p-3 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={employee.lastName} onChange={handleInputChange} />
//             </label>

//             <label className="flex flex-col w-full">
//               <span className="font-medium text-gray-700">Phone Number:</span>
//               <input type="text" name="phoneNumber" className="mt-1 p-3 rounded-lg outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500" value={employee.phoneNumber} onChange={handleInputChange} />
//             </label>

//             <label className="flex flex-col w-full">
//               <span className="font-medium text-gray-700">Email:</span>
//               <input type="email" name="email" className="mt-1 p-3 rounded-lg outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500" value={employee.email} readOnly />
//             </label>

//             <label className="flex flex-col w-full">
//               <span className="font-medium text-gray-700">Bio:</span>
//               <textarea name="bio" cols="30" rows="4" value={employee.bio} className="mt-1 p-3 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleInputChange} />
//             </label>

//             <div className="flex gap-4 mt-4">
//               <button className="bg-blue-600 p-3 rounded-xl w-24 text-white font-medium hover:bg-blue-700 transition duration-300" type="submit">Save</button>
//               <button type="button" onClick={toggleEditMode} className="bg-red-600 p-3 w-24 rounded-xl text-white font-medium hover:bg-red-700 transition duration-300">Cancel</button>
//             </div>
//           </form>
//         ) : (
//           <div className="employee-details text-lg flex flex-col space-y-6 w-full">
//             <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
//               <div className="flex-shrink-0 px-10">
//                 <img className="rounded-full h-28 w-28 border-2 lg:h-40 lg:w-40 border-black" src={avatar} width={'120'} alt="Profile Image" />
//               </div>

//               <div className="flex flex-col lg:ml-6 lg:flex-1">
//                 <div className="flex gap-2 my-6">
//                   <p className="text-4xl font-semibold font-playfair"> {employee.firstName}</p>
//                   <p className="text-4xl font-semibold font-playfair"> {employee.lastName}</p>
//                 </div>

//                 <div className="my-3">
//                   <p className="text-2xl"> {employee.phoneNumber}</p>
//                 </div>

//                 <div className="my-4">
//                   <p className="text-2xl"> {employee.email}</p>
//                 </div>

//               </div>
//             </div>

//             <button onClick={toggleEditMode} className="absolute top-0 right-0 flex gap-2 items-center p-2 rounded-xl w-24 text-red-700">
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
//                 <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
//                 <path d="m15 5 4 4" />
//               </svg>
//               Edit
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default EmpProfile;
