import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "./components/admin/AdminLayout";
import StudentLayout from "./components/student/StudentLayout";
import AlumniLayout from "./components/alumni/AlumniLayout";

// Pages
import Login from "./pages/Login";


// Admin Pages
import Alumni_Management from "./pages/admin/Alumni_Management";
import Donation from "./pages/admin/Donations";
import Event_Management from "./pages/admin/Event_Management";
import File_Storage from "./pages/admin/File_Storage";
import Students from "./pages/admin/Students";

// Student Pages
import Alumni_Directory from "./pages/student/Alumni_Directory";
import Event from "./pages/student/Events";
import Mentorship from "./pages/student/Mentorship";
import My_Profile from "./pages/student/My_Profile";

// Alumni Pages
import Donations from "./pages/alumni/Donations";
import Events from "./pages/alumni/Events";
import Mentorship_Request from "./pages/alumni/Mentorship_Request";
import Privacy from "./pages/alumni/Privacy";
import Professional_Details from "./pages/alumni/Professional_Details";

const App = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="Alumni_Management" element={<Alumni_Management />} />
        <Route path="Donations" element={<Donation />} />
        <Route path="Event_Management" element={<Event_Management />} />
        <Route path="File_Storage" element={<File_Storage />} />
        <Route path="Students" element={<Students />} />
      </Route>

      {/* Student Routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route path="Alumni_Directory" element={<Alumni_Directory />} />
        <Route path="Events" element={<Event />} />
        <Route path="Mentorship" element={<Mentorship />} />
        <Route path="My_Profile" element={<My_Profile />} />
      </Route>

      {/* Alumni Routes */}
      <Route path="/alumni" element={<AlumniLayout />}>
        <Route path="Events" element={<Events />} />
        <Route path="Donations" element={<Donations />} />
        <Route path="Mentorship_Request" element={<Mentorship_Request />} />
        <Route path="Privacy" element={<Privacy />} />
        <Route path="Professional_Details" element={<Professional_Details />} />
      </Route>
    </Routes>
  );
};

export default App;
