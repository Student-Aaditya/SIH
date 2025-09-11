// src/pages/alumni/Privacy.jsx
import React, { useState } from "react";

const Privacy = () => {
  const [isDeactivated, setIsDeactivated] = useState(false);

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
            Privacy & Account Settings
          </h1>
          <p style={{ fontSize: "1rem", maxWidth: "80%", margin: "0 auto" }}>
            Manage your account settings and privacy preferences. You can
            deactivate your account or modify settings to control your presence
            on the platform.
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

        {/* Account Deactivation */}
        <div className="mb-4">
          <h3 className="fw-bold text-dark mb-3">Account Deactivation</h3>
          <div
            className="d-flex justify-content-between align-items-center p-4 rounded shadow-sm"
            style={{
              background: "#ffffff",
              transition: "all 0.3s ease",
            }}
          >
            <div>
              <p className="mb-1 fw-semibold text-dark">Deactivate Account</p>
              <p
                className="mb-0 text-secondary"
                style={{ fontSize: "0.95rem" }}
              >
                Deactivating your account will remove your profile from the
                platform and hide your activity. This action is reversible.
              </p>
            </div>
            <div>
              <label
                className="switch"
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "50px",
                  height: "26px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isDeactivated}
                  onChange={() => setIsDeactivated(!isDeactivated)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    position: "absolute",
                    cursor: "pointer",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isDeactivated
                      ? "linear-gradient(135deg, #ff6b6b, #ff8787)"
                      : "#ccc",
                    transition: ".4s",
                    borderRadius: "34px",
                  }}
                ></span>
                <span
                  style={{
                    position: "absolute",
                    content: '""',
                    height: "20px",
                    width: "20px",
                    left: "3px",
                    bottom: "3px",
                    backgroundColor: "#fff",
                    transition: ".4s",
                    borderRadius: "50%",
                    transform: isDeactivated ? "translateX(24px)" : "translateX(0)",
                  }}
                ></span>
              </label>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
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
  );
};

export default Privacy;
