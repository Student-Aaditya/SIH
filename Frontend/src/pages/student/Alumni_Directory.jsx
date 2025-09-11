// src/pages/student/Alumni_Directory.jsx
import React from "react";

const alumniData = [
  {
    name: "Emily Harper",
    role: "Software Engineer at Tech Innovators Inc.",
    description: "Specializes in AI and Machine Learning",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA__EdJkFkjqePFmczQnADyWqypc67coOrqBmuJRyHyZhR0YwpFMu_a1NM0yVPOrV7IKgS0o7BiLdYXrCXRDxDpdu7IThMpzykGg_2zgVRDFaqphSehJgqRCosGMAN79skefTKFl6OjW2yeR07lUmr8tO0mkrsWa30OCfBZkQ1EGo6x0zluzjgcnc0AJDMDaGB1XBaKKHxAINqLSqdav7abCx8sjlJlfcfA8_62QRmQlj2AiBu4arQ6eYSP1znjYkIJN9jpAUNOSqqH",
  },
  {
    name: "Owen Turner",
    role: "Product Manager at Global Solutions Corp.",
    description: "Experienced in Agile methodologies and product strategy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsUNL-4UAm0Z5uv930YEjLWtMljGKvREnC9mJKkaTbHxRBriM-4j-C3PV2AAvlosmTn2Sz_3bxkVds57VS_e-p8KFSYyya19vzhgfkwwHT0xa7kGXLh4aJDxyJVDmnbvjHT4qW5zN7nGP4XlwSjxbdzYL-CS75r6cA9OOmO4qEmjuUdxJ5P_be11Iq4EwINi_g5y3Ou_K6Mn7JsbMfHRei6L6hUW7hMblLQEENz48Wrg6okMKqZ7wpqOs13MJPjFPKoB7iY5w67nK6",
  },
  {
    name: "Chloe Mitchell",
    role: "Marketing Director at Creative Marketing Agency",
    description: "Expert in digital marketing and brand management",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBa_j8h7hL-E8IQdyGJBZFAYgBi_2Vj2sb5ahOy_6IQofS-ztF9KkjxnyIUmDkXAKT8I0QIbf9GF15Yn16v7TvBZJaeYxd0U5ErBeRhkEsYSGmcrE-3ftdCg1Ufa5pVPWS5U5xZzgUWQADBbipvbV1sm0ACQzQs57ktbG2wR6pFw0Gn2_5uK08VwiBOBXJ7FImn3QpzvFx5YscfocrX8xN9wW1GGeVjmf-RVyZDxJhzyGDW6KQGaG1ebK2fggPNNEMKq0bvBUGJFfrH",
  },
  {
    name: "Noah Parker",
    role: "Financial Analyst at Investment Group LLC",
    description: "Focuses on investment analysis and portfolio management",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhAqqs-MaNLsT-NQ-4jq1rWVPZhaoAEbK5rbvymX-2JFdbGvzUruVAbjsDsGlcEXfTFIEATI64gtLzXCaBbOmnMomElWEhN1I0tyJLIEsm2b9PAkq9OJQ47Mn4VnkIoDpOvf5GscQGbVgr9Zkebqh3amts4_eo_98mnm7wNYnhQu2bqa46n2X_ukQ_lyuRlro-hRkmsezMsW_8qmgzhgiDJOYdAalVm49OtKxkPHMJqc8jpWTA0LsNAY0kQwDJ0dWbUnYf1fKAgjMa",
  },
];

const Alumni_Directory = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2" style={{ color: "#4b4bff" }}>
          Alumni Directory
        </h1>
        <p className="text-muted">Connect with fellow alumni and expand your network</p>
      </div>

      {/* Search & Filters */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-2">
        <input
          type="text"
          className="form-control flex-grow-1 shadow-sm"
          placeholder="Search by name, skills, or company"
          style={{ borderRadius: "50px" }}
        />
        <div className="d-flex flex-wrap gap-2 mt-2 mt-md-0">
          {["Branch", "Year", "Skills", "Company"].map((filter) => (
            <button
              key={filter}
              className="btn btn-outline-primary rounded-pill py-1 px-3 shadow-sm"
            >
              {filter} <i className="bi bi-caret-down-fill ms-1"></i>
            </button>
          ))}
        </div>
      </div>

      {/* Alumni Cards */}
      <div className="row g-4">
        {alumniData.map((alumni, index) => (
          <div className="col-12 col-md-6" key={index}>
            <div
              className="card h-100 shadow-sm rounded-4 overflow-hidden"
              style={{
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              <div className="d-flex flex-column flex-md-row">
                {/* Image */}
                <div
                  style={{
                    backgroundImage: `url(${alumni.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "180px",
                    width: "100%",
                    maxWidth: "180px",
                  }}
                  className="flex-shrink-0"
                ></div>

                {/* Info */}
                <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <h5 className="fw-bold mb-1">{alumni.name}</h5>
                    <p className="text-muted mb-1">{alumni.role}</p>
                    <p className="text-secondary small">{alumni.description}</p>
                  </div>
                  <button
                    className="btn mt-2 align-self-start rounded-pill px-4 py-1"
                    style={{
                      background: "linear-gradient(135deg, #6c63ff, #00c6ff)",
                      color: "#fff",
                      border: "none",
                    }}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination flex-wrap">
          <li className="page-item">
            <a className="page-link" href="#">&laquo;</a>
          </li>
          {[1, 2, 3, "...", 10].map((page, i) => (
            <li key={i} className={`page-item ${page === 1 ? "active" : ""}`}>
              <a className="page-link" href="#">{page}</a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link" href="#">&raquo;</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Alumni_Directory;
