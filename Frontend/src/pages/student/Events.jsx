// src/pages/student/Events.jsx
import React from "react";
import { FaCalendarAlt, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

const eventsData = [
  { title: "Networking Mixer", date: "October 26, 2024", time: "6:00 PM - 8:00 PM", type: "Networking" },
  { title: "Career Fair", date: "November 15, 2024", time: "7:00 PM - 9:00 PM", type: "Career" },
  { title: "Holiday Social", date: "December 5, 2024", time: "5:30 PM - 7:30 PM", type: "Social" },
  { title: "Alumni Panel Discussion", date: "January 18, 2025", time: "6:30 PM - 8:30 PM", type: "Panel" },
  { title: "Mentorship Workshop", date: "February 22, 2025", time: "7:00 PM - 9:00 PM", type: "Workshop" },
];

const eventIcons = {
  Networking: <FaUsers color="#6c63ff" />,
  Career: <FaCalendarAlt color="#28a745" />,
  Social: <FaUsers color="#ff9800" />,
  Panel: <FaChalkboardTeacher color="#e91e63" />,
  Workshop: <FaChalkboardTeacher color="#00bcd4" />,
};

const Events = () => {
  return (
    <div style={{ minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden" }}>
      {/* Fullscreen Background Image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px) brightness(0.7)",
          zIndex: -1,
        }}
      ></div>

      {/* Main Content */}
      <div className="container col-12 col-md-10 mx-auto" style={{ position: "relative", zIndex: 1, padding: "4rem 1rem" }}>
        <div className="text-center rounded mb-5 p-5 shadow" style={{ background: "rgba(108, 99, 255, 0.8)", color: "#fff" }}>
          <h1 className="fw-bold mb-3" style={{ fontSize: "2.8rem" }}>Upcoming Events</h1>
          <p className="mb-0" style={{ fontSize: "1.05rem" }}>Stay updated with all upcoming campus events and activities</p>
        </div>

        <div className="row g-4">
          {eventsData.map((event, index) => (
            <div key={index} className="col-12 col-md-6">
              <div className="p-4 rounded shadow position-relative d-flex flex-column" style={{ background: "rgba(255,255,255,0.9)" }}>
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", background: "rgba(108, 99, 255, 0.1)", borderRadius: "50%", zIndex: 0 }}></div>

                <div style={{ zIndex: 1 }}>
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div style={{ fontSize: "1.5rem" }}>{eventIcons[event.type]}</div>
                    <h5 className="fw-bold mb-0">{event.title}</h5>
                  </div>
                  <p className="text-muted mb-2" style={{ fontSize: "0.9rem" }}>{event.date} | {event.time}</p>
                  <span className="fw-bold px-3 py-1 rounded-pill" style={{
                    fontSize: "0.8rem",
                    background:
                      event.type === "Networking"
                        ? "linear-gradient(135deg, #6c63ff, #8e78ff)"
                        : event.type === "Career"
                        ? "linear-gradient(135deg, #28a745, #5cd65c)"
                        : event.type === "Social"
                        ? "linear-gradient(135deg, #ff9800, #ffc107)"
                        : event.type === "Panel"
                        ? "linear-gradient(135deg, #e91e63, #ff6f91)"
                        : "linear-gradient(135deg, #00bcd4, #26c6da)",
                    color: "#fff",
                  }}>{event.type}</span>

                  {/* Register button at right corner */}
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary" style={{ background: "linear-gradient(135deg, #6c63ff, #00c6ff)", border: "none" }}>Register</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
