// src/layouts/StudentLayout.jsx
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens or user data if needed
    // Then redirect to login page
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4" to="/student">
            Student Portal
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#studentNavbar"
            aria-controls="studentNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="studentNavbar">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link text-white mx-2 px-2 py-1 rounded"
                  to="/student/Alumni_Directory"
                  style={{ transition: "0.3s" }}
                >
                  Alumni Directory
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white mx-2 px-2 py-1 rounded"
                  to="/student/Events"
                  style={{ transition: "0.3s" }}
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white mx-2 px-2 py-1 rounded"
                  to="/student/Mentorship"
                  style={{ transition: "0.3s" }}
                >
                  Mentorship
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white mx-2 px-2 py-1 rounded"
                  to="/student/My_Profile"
                  style={{ transition: "0.3s" }}
                >
                  My Profile
                </Link>
              </li>

              {/* Logout Button */}
              <li className="nav-item ms-3">
                <button
                  className="btn btn-outline-light btn-sm fw-semibold"
                  onClick={handleLogout}
                  style={{ borderRadius: "20px", transition: "0.3s" }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-grow-1 container py-4">
        <Outlet />
      </div>

      {/* Footer */}
      <footer
        className="bg-dark text-white text-center py-3 mt-auto shadow-sm"
        style={{ fontSize: "0.9rem" }}
      >
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Student Portal. All rights reserved.
        </p>
        <p className="mb-0">
          Contact: <a href="mailto:info@studentportal.com" className="text-white">info@studentportal.com</a> | Phone: +91 9876543210
        </p>
      </footer>
    </div>
  );
};

export default StudentLayout;
