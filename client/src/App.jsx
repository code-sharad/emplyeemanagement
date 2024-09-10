
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPass from './employee/ForgotPass';
import Home from './views/Home/Home';
import { EmployeeDashboard } from './views/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import { AdminDashboard } from './views/Dashboard/Dashboard'; // Assuming you have an AdminDashboard component
import {Landing} from './views/Landing/Landing';
import Leave from './views/Leave/Leave';
import Task, { AddTask } from './components/task/Task';

import { AuthProvider } from './Context/AdminContextProvider';

import { HelpAndSupport } from './components/HelpAndSupport/HelpAndSupport';
import AdminProfile from './components/Admin/AdminProfile/AdminProfile';
import AdminForm from './components/Admin/AdminForm/AdminForm';
import Register from './components/Admin/Register/Register';
import { FaSign } from 'react-icons/fa';
import { SignUp } from './components/Admin/SignUp/SignUp';
import AdmLogin from './components/Login/AdmLogin';

import AutoCapture from './components/ScreenRecorder/AutoCapture';
import PhotoCapture from './components/ScreenRecorder/PhotoCapture';
import EmpLogin from './components/Login/EmpLogin';
import AboutPage from './views/About/About';
import NotFound from "../src/views/404"
import Calendar from './views/EmployeeProfile/Calender';
import WeekPicker from './views/Calender';


function App() {


  if(localStorage.getItem('theme') === null){
    localStorage.setItem('theme', 'light');
  }

  const [userType, setUserType] = useState("employee"); // Track user type ('employee' or 'admin')
  
  const [loginType, setLoginType] = useState("employee"); // Track user type ('employee' or 'admin')

  return (
    <BrowserRouter>
      <RoutesWrapper userType={userType} setUserType={setUserType} setLoginType={setLoginType} loginType={loginType} />
    </BrowserRouter>
  );
}

const RoutesWrapper = ({ userType, setUserType, setLoginType, loginType }) => {
  return (
    <AuthProvider>
      <Navbar userType={userType} setUserType={setUserType} />{" "}
      {/* Conditionally render Navbar */}
      <Routes>
        {userType!== "admin" ? (
          <Route path="/emp-dashboard" element={<EmployeeDashboard />} />
          
        ) : null}
        <Route path="/" element={<Landing setLoginType={setLoginType} />} />
        <Route path="/home" element={<Home loginType={loginType} />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />{" "}
        {/* Add Admin Dashboard route */}
        <Route path="/support" element={<HelpAndSupport />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/adminlogin" element={<AdmLogin />} />
        <Route path="/emplogin" element={<EmpLogin />} />
        <Route path="/cap" element={<PhotoCapture />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ca" element={<WeekPicker />} />
        <Route path="/*" element={<NotFound />} />
        {/***  testing routes  */}
        <Route path="/task" element={<Task />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/form" element={<AdminForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/screen" element={<AutoCapture />} />
        {/****  this is the comment  */}
      </Routes>
    </AuthProvider>
  );
};

export default App;
