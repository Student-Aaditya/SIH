// src/pages/student/Mentorship.jsx
import React from "react";
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const mentorshipRequests = {
  pending: [
    {
      name: "Sophia Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDuT8GVk42PB7Xn4Z4PI2aXFgINsOkM_EgYu-xMsaHIuQHcNB60U8WjvaZ9zUFjTTFP5Mm2Lq00hoTix6QLIp-Pju8qbUOShZE2JHsA2gcVu2C2Z10GGBSEXQaKms7myE6NbcPNbnBSanS_QsUBvFFfK6UYHmPlphn1jOH49OI0OBxa7HDazwwh2FLL1RJ1U1pWPjjq2WRVmOXBT_iBjJy94R8FsHo9Cv3OpVwxtnsWsNOs2HdRQIv0vlFEEMWMq55swDlPJNK-NBbE",
      date: "Oct 26, 2023",
      status: "Pending",
    },
    {
      name: "Ethan Lee",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB4GHBdROwil5eF8OskUbv-w2yY6a8G6NXbjTQZTr9zh8ov7hxP_WihbzJK3FPS6BBIbhC9gJLAcymVnzHexD08ieh3xzMEaychyVBF5dZ_PReoKfbixPVTAQ5Yh_bSBpxHDKOQ2mhF1OUPRpwb1HjgbEmqtFA3KuUSobIwwI1fJjpjOlY8nqVL7a1NrCqfbIQtX__hGJmL4tWyyGO4sEQ1LOtjWdQKxiK7FpcIs3WPnDASHOJLsMlPeNXkqfZOwiPXiVRNXWDh8JSu",
      date: "Nov 15, 2023",
      status: "Pending",
    },
  ],
  accepted: [
    {
      name: "Olivia Wong",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDvEPi1oF6BXYXHGWFFBrBbOdsEeBCTlpfH6bh2riwj-0eObIit_p09JutqNBz5VA4OTrmlfG3u8XhNchPFEvDEaJnxZHRYBGtO4HhkBlgq7_hoMfXd1wtJZ3C2N6gYojb0t282U_FavrF8bwn_Y-fd3FlF2W3ib0JMW0zPw2rlXGsGO_SNXn-5RLqdj7vu01dSovQuaxd726RBB_l-B1onpQDByVBgSExflyKue1M02Kw8EUBRSshMDCT68HTaTuE9MQCouBxpsKRN",
      date: "Sep 10, 2023",
      status: "Accepted",
    },
  ],
  rejected: [
    {
      name: "Nathan Tan",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBX408dsh9s4d4d0v79r5Fe_KoQ-xw8DmWjNuTgGuOKfbsT_3L0vQ4gzO-QRdVYsPdDiA8on0k3LymwIWjVFU5jQbj-Qwwoso4UQU_XHl0059TVHzvvY449KNGTJPBWp5DRS1GDyh8pqscffhCN1mSacknxTibgToLT0eRErXzaYCifOOlukYPHSG1WmLZfCqb2KUQP2m4FEYvgyMddPmAGfl4hzVyOor5TbtQc9pDZqV2I_AYk9M-wAJHLMn9G6ajjRW21sR-IW_HR",
      date: "Aug 5, 2023",
      status: "Rejected",
    },
  ],
};

const statusIcons = {
  Pending: <FaHourglassHalf color="#ffc107" />,
  Accepted: <FaCheckCircle color="#28a745" />,
  Rejected: <FaTimesCircle color="#dc3545" />,
};

const Mentorship = () => {
  const renderRequests = (requests) =>
    requests.map((req, index) => (
      <div
        key={index}
        className="position-relative p-4 rounded shadow mb-4"
        style={{
          background: "rgba(255,255,255,0.9)",
          overflow: "hidden",
        }}
      >
        {/* Decorative shape */}
        <div
          style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "100px",
            height: "100px",
            background:
              req.status === "Accepted"
                ? "rgba(40, 167, 69, 0.15)"
                : req.status === "Rejected"
                ? "rgba(220, 53, 69, 0.15)"
                : "rgba(255, 193, 7, 0.15)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        ></div>

        <div className="d-flex align-items-center gap-3 mb-2" style={{ zIndex: 1 }}>
          <img
            src={req.avatar}
            alt={req.name}
            className="rounded-circle shadow-sm"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
          <div>
            <p className="mb-1 fw-semibold" style={{ color: "#333", fontSize: "1rem" }}>
              {req.status === "Accepted" ? `Mentorship with ${req.name}` : `Request to ${req.name}`}
            </p>
            <small className="text-muted d-block" style={{ fontSize: "0.85rem" }}>
              {req.status === "Pending"
                ? `Request sent on ${req.date}`
                : `Request ${req.status.toLowerCase()} on ${req.date}`}
            </small>
          </div>
        </div>

        <div className="text-md-end mt-2 mt-md-0" style={{ zIndex: 1 }}>
          <span
            className="fw-bold px-3 py-1 rounded-pill"
            style={{
              color: "#fff",
              fontSize: "0.85rem",
              background:
                req.status === "Accepted"
                  ? "linear-gradient(135deg, #28a745, #2ecc71)"
                  : req.status === "Rejected"
                  ? "linear-gradient(135deg, #dc3545, #e74c3c)"
                  : "linear-gradient(135deg, #ffc107, #ffca28)",
            }}
          >
            {statusIcons[req.status]} {req.status}
          </span>
        </div>
      </div>
    ));

  return (
    <div style={{ minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden" }}>

      {/* Main content */}
      <div className="container col-12 col-md-10 mx-auto" style={{ position: "relative", zIndex: 1, padding: "4rem 1rem" }}>
        {/* Hero Header */}
        <div
          className="text-center rounded mb-5 p-5 shadow"
          style={{
            background: "linear-gradient(135deg, #6c63ff, #00c6ff)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h1 className="fw-bold mb-3" style={{ fontSize: "2.8rem" }}>
            Mentorship Requests
          </h1>
          <p className="mb-0" style={{ fontSize: "1.05rem" }}>
            Track the status of your mentorship requests to alumni
          </p>
          <div
            style={{
              position: "absolute",
              bottom: "-20px",
              left: "-20px",
              width: "120px",
              height: "120px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
            }}
          ></div>
        </div>

        {/* Request Sections */}
        <h5 className="fw-bold text-secondary d-flex align-items-center gap-2 mb-3">
          <FaHourglassHalf /> Pending Requests
        </h5>
        {renderRequests(mentorshipRequests.pending)}

        <h5 className="fw-bold text-success d-flex align-items-center gap-2 mt-4 mb-3">
          <FaCheckCircle /> Accepted Requests
        </h5>
        {renderRequests(mentorshipRequests.accepted)}

        <h5 className="fw-bold text-danger d-flex align-items-center gap-2 mt-4 mb-3">
          <FaTimesCircle /> Rejected Requests
        </h5>
        {renderRequests(mentorshipRequests.rejected)}
      </div>
    </div>
  );
};

export default Mentorship;
