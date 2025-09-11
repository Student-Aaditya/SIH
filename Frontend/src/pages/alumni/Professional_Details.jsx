// src/pages/alumni/Professional_Details.jsx
import React from "react";

const Professional_Details = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fa",
        padding: "4rem 1rem",
      }}
    >
      <div className="container col-12 col-md-10 col-lg-8 mx-auto">
        {/* Header */}
        <div
          className="text-center mb-5 p-5 rounded shadow-lg"
          style={{
            background: "linear-gradient(135deg, #6c63ff, #00c6ff)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            Professional Details
          </h1>
          <p style={{ fontSize: "1rem", maxWidth: "80%", margin: "0 auto" }}>
            Update your professional information to connect with fellow alumni
            and explore new opportunities.
          </p>
          <div
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
            }}
          ></div>
        </div>

        {/* Form Section */}
        <div
          className="p-4 rounded shadow-sm"
          style={{ background: "#fff", transition: "all 0.3s ease" }}
        >
          {/* Company */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Company</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter your company"
            />
          </div>

          {/* Position */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Position</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter your position"
            />
          </div>

          {/* Skills */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark">Skills</label>
            <textarea
              className="form-control shadow-sm"
              rows="5"
              placeholder="Enter your skills"
            ></textarea>
          </div>

          {/* Save Button */}
          <div className="text-center mt-4">
            <button
              className="fw-bold"
              style={{
                padding: "0.65rem 2rem",
                fontSize: "1rem",
                color: "#fff",
                background: "linear-gradient(135deg, #6c63ff, #00c6ff)",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Professional_Details;
