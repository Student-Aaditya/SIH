import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4" to="/admin">
            Admin Panel
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
            aria-controls="adminNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link text-white mx-2 px-2 py-1 rounded"
                  to="/admin/Alumni_Management"
                  style={{ transition: "0.3s" }}
                >
                  Alumni
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white mx-2 px-2 py-1 rounded"
                  to="/admin/Donations"
                  style={{ transition: "0.3s" }}
                >
                  Donations
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-white mx-2 px-2 py-1 rounded"
                  to="/admin/Event_Management"
                  style={{ transition: "0.3s" }}
                >
                  Events
                </Link>
              </li>
              



              <li className="nav-item">
                <Link
                  className="nav-link text-white mx-2 px-2 py-1 rounded"
                  to="/admin/Students"
                  style={{ transition: "0.3s" }}
                >
                  Students
                </Link>
              </li>


              <li className="nav-item">
                <Link
                  className="nav-link text-white mx-2 px-2 py-1 rounded"
                  to="/admin/File_Storage"
                  style={{ transition: "0.3s" }}
                >
                  Dashboard
                </Link>
              </li>


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

      <div className="flex-grow-1 container py-4">
        <Outlet />
      </div>

      <footer
        className="bg-dark text-white text-center py-3 mt-auto shadow-sm"
        style={{ fontSize: "0.9rem" }}
      >
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>
        <p className="mb-0">
          Contact:{" "}
          <a href="mailto:admin@portal.com" className="text-white">
            admin@portal.com
          </a>{" "}
          | Phone: +91 9876543210
        </p>
      </footer>
    </div>
  );
};

export default AdminLayout;
