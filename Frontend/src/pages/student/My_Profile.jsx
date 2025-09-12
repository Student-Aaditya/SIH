// /student/My_Profile.jsx
import React, { useState } from "react";

const profileData = {
  personal: {
    name: "Olivia Bennett",
    email: "olivia.bennett@email.com",
    university: "Stanford University",
    major: "Computer Science",
  },
  academic: {
    graduationYear: "2025",
    gpa: "3.8",
    coursework: "Data Structures, Algorithms, Machine Learning",
  },
  interests: [
    "AI",
    "Finance",
    "Design",
    "Entrepreneurship",
    "Product Management",
    "Consulting",
  ],
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYDUi_nv0lp6v0_HPgCgYMYp8By8Iof1VYrUfNMyb3bSRaU_3f6c35gH7Kf-EvN0zM8syZmGqh512kkiyKyuISzj7heJ0nIhOqIh5rJffllPmRaxbIgPGAKAoxQHFT0QJscWkkT3eoY1BxOr8o9XDCG5y9Qaa61tBgX2CUuKBsHaFPOUPcb3bXtGdqCK-TBVwG26UBJP_4ZACtIqV_xXhzqMLBtgWy5jPyx8r_vqRBO1J63_ZklOKjzZVKLi3Jg45pirfgF97hTQK8",
};

const My_Profile = () => {
  const [interests, setInterests] = useState(profileData.interests);
  const [newInterest, setNewInterest] = useState("");

  const addInterest = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleSave = () => {
    // In a real app, this would send the updated interests to the backend
    console.log("Saved interests:", interests);
    alert("Interests saved successfully!");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", padding: "3rem 1rem" }}>
      <div className="container col-12 col-md-10 mx-auto">
        <h2 className="text-center mb-5" style={{ color: "#333", fontWeight: "700" }}>
          My Profile
        </h2>

        {/* Profile Header */}
        <div
          className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 mb-5 p-4"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            borderLeft: "6px solid #6c63ff",
          }}
        >
          <div className="d-flex align-items-center gap-4">
            <img
              src={profileData.avatar}
              alt={profileData.personal.name}
              className="rounded-circle shadow-sm"
              style={{ width: "140px", height: "140px", objectFit: "cover" }}
            />
            <div className="text-center text-md-start">
              <h2 style={{ color: "#6c63ff", fontWeight: "700", marginBottom: "0.3rem" }}>
                {profileData.personal.name}
              </h2>
              <p className="mb-1" style={{ color: "#555" }}>
                {profileData.personal.university}
              </p>
              <p className="mb-0" style={{ color: "#555" }}>
                {profileData.personal.major}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <section className="mb-4">
          <h4 style={{ color: "#6c63ff", fontWeight: "600", marginBottom: "1rem" }}>
            Personal Information
          </h4>
          <div className="row g-3">
            {Object.entries(profileData.personal).map(([key, value], idx) => (
              <div key={idx} className="col-12 col-md-6">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "1rem",
                    borderRadius: "12px",
                    borderLeft: "4px solid #ff6584",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  <span className="text-muted text-capitalize">{key}</span>
                  <p className="mb-0 fw-medium" style={{ color: "#333" }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Information */}
        <section className="mb-4">
          <h4 style={{ color: "#6c63ff", fontWeight: "600", marginBottom: "1rem" }}>
            Academic Information
          </h4>
          <div className="row g-3">
            {Object.entries(profileData.academic).map(([key, value], idx) => (
              <div key={idx} className="col-12 col-md-6">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "1rem",
                    borderRadius: "12px",
                    borderLeft: "4px solid #ffb946",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  <span className="text-muted text-capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <p className="mb-0 fw-medium" style={{ color: "#333" }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section className="mb-4">
          <h4 style={{ color: "#6c63ff", fontWeight: "600", marginBottom: "1rem" }}>
            Interests
          </h4>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {interests.map((interest, idx) => (
              <span
                key={idx}
                className="d-flex align-items-center"
                style={{
                  backgroundColor: "#ff6584",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  fontWeight: "500",
                  borderRadius: "50px",
                }}
              >
                {interest}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  aria-label="Remove"
                  onClick={() => removeInterest(interest)}
                  style={{ fontSize: "0.7rem" }}
                />
              </span>
            ))}
          </div>
          <div className="input-group mb-3" style={{ maxWidth: "400px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Add new interest"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button" onClick={addInterest}>
              Add
            </button>
          </div>
          <div className="d-flex justify-content-end">
            <button
              className="btn"
              style={{
                backgroundColor: "#6c63ff",
                color: "#fff",
                fontWeight: "600",
                borderRadius: "50px",
                padding: "0.6rem 2rem",
                border: "none",
              }}
              onClick={handleSave}
            >
              Save Interests
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default My_Profile;
