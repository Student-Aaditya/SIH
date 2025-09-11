// src/pages/alumni/Events.jsx
import React from "react";

const events = [
  {
    title: "Alumni Homecoming Gala",
    description:
      "Join us for an evening of networking and reminiscing at the annual Alumni Homecoming Gala. Reconnect with classmates, faculty, and friends while enjoying live music, delicious food, and a special keynote address from a distinguished alumnus.",
    date: "October 26, 2024 · 6:00 PM - 9:00 PM",
  },
  {
    title: "Entrepreneurship Panel Discussion",
    description:
      "Attend a virtual panel discussion featuring successful alumni entrepreneurs who will share their insights, experiences, and advice on launching and growing a business. This event is perfect for aspiring entrepreneurs and those interested in learning about the startup ecosystem.",
    date: "November 15, 2024 · 7:00 PM - 8:30 PM",
  },
  {
    title: "Holiday Alumni Mixer",
    description:
      "Celebrate the holiday season with fellow alumni at our annual Holiday Mixer. Enjoy festive drinks, appetizers, and holiday cheer in a relaxed and social atmosphere. This is a great opportunity to network and connect with alumni from various fields.",
    date: "December 5, 2024 · 5:30 PM - 7:00 PM",
  },
  {
    title: "Career Development Workshop",
    description:
      "Participate in a career development workshop designed to help alumni enhance their professional skills and advance their careers. Topics will include resume writing, interview techniques, and networking strategies. This workshop is ideal for alumni seeking new job opportunities or career growth.",
    date: "January 18, 2025 · 10:00 AM - 12:00 PM",
  },
];

const Events = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        padding: "4rem 1rem",
      }}
    >
      <div className="container col-12 col-md-10 mx-auto">
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
            Upcoming Alumni Events
          </h1>
          <p style={{ fontSize: "1rem", maxWidth: "80%", margin: "0 auto" }}>
            Stay connected and engaged with your alumni community. Don’t miss these exciting events!
          </p>
          {/* Decorative Circle */}
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "-40px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
            }}
          ></div>
        </div>

        {/* Event Cards */}
        <div className="row g-4">
          {events.map((event, index) => (
            <div className="col-12" key={index}>
              <div
                className="p-4 rounded shadow position-relative"
                style={{ background: "#ffffff" }}
              >
                {/* Decorative Shape */}
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(108, 99, 255, 0.1)",
                    zIndex: 0,
                  }}
                ></div>

                {/* Event Content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h4 className="fw-bold mb-2">{event.title}</h4>
                  <p className="text-secondary mb-2" style={{ fontSize: "0.95rem" }}>
                    {event.description}
                  </p>
                  <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>
                    {event.date}
                  </p>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
