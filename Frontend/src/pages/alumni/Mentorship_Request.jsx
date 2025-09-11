// src/pages/alumni/Mentorship_Request.jsx
import React from "react";

const mentorshipRequests = [
  {
    name: "Ethan Carter",
    course: "Computer Science",
    year: "Class of 2024",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8CrXscpYY1lm5ZHLP72HpCQXNE0t9C16bd1osR_1dQdvcrPBpBhBQX2cP763l29Qe6qIlTKXIVP7rxFr_U8RhjMiG-FNQRKOY7GsIvqHVi_u5Yk1zkRWcngoTpOvE1Z5bJS07XANPSW4dXl070XlTzH_CXsLh2hZlEl0gQLxmujF0_GQTgHFWAla2og382HXWo1uW2K2fMZ3iKSlPkPmR0MWjNOYNTq6KETbOVqDyaLqTFmAFcrPr1MB6kTiXHQH_qZoOY_FzY-c",
  },
  {
    name: "Olivia Bennett",
    course: "Business Administration",
    year: "Class of 2025",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfZh5y0rI4iDOLrd1HGIwJ2Hswvsxs1uyCP89mMZQGtxCctJDcnBVHyp-40mJI8z_029ohfQEOBTku4ujOuNTsesLoSyrwxJcm7PBBk87HTLThaW2grh4hGVDrE0nuoTMuSZALT-P88Dkq0Zx2sTuu8LExdBi-v-OfyR1Mdkc31-_c1jlfWpDAr2VihZAXQrrN1i0ehjOGaaf2ROKqV034kfiPmvmxJK7RF48bb4pBJzJWm2RMc5wCTLGrTK_ukiksTz-9MqgKfDA",
  },
];

const Mentorship_Request = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
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
            Mentorship Requests
          </h1>
          <p style={{ fontSize: "1rem", maxWidth: "80%", margin: "0 auto" }}>
            Review requests from students seeking guidance and support. Accept or reject requests to help shape the next generation.
          </p>
          <div
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
            }}
          ></div>
        </div>

        {/* Request Cards */}
        <div className="row g-4">
          {mentorshipRequests.map((request, index) => (
            <div className="col-12" key={index}>
              <div
                className="p-4 rounded shadow position-relative d-flex flex-column flex-md-row align-items-center justify-content-between"
                style={{ background: "#ffffff" }}
              >
                {/* Decorative Circle */}
                <div
                  style={{
                    position: "absolute",
                    top: "-15px",
                    left: "-15px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "rgba(108, 99, 255, 0.1)",
                    zIndex: 0,
                  }}
                ></div>

                {/* Profile Info */}
                <div className="d-flex align-items-center gap-3" style={{ zIndex: 1 }}>
                  <img
                    src={request.image}
                    alt={request.name}
                    className="rounded-circle shadow-sm"
                    style={{ width: "64px", height: "64px", objectFit: "cover" }}
                  />
                  <div>
                    <p className="mb-1 fw-bold text-dark">{request.name}</p>
                    <p className="mb-0 text-secondary" style={{ fontSize: "0.9rem" }}>
                      {request.course}, {request.year}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2 mt-3 mt-md-0" style={{ zIndex: 1 }}>
                  <button
                    className="btn fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #6c63ff, #00c6ff)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "25px",
                      padding: "0.5rem 1.25rem",
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #ff6b6b, #ff8787)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "25px",
                      padding: "0.5rem 1.25rem",
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentorship_Request;
