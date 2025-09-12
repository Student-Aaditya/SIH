import React, { useState, useContext } from "react";
import { Button, Dropdown, Form, Modal, Badge } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";
import MentorshipContext from "../../context/MentorshipContext";

const alumniData = [
  {
    name: "Emily Harper",
    role: "Software Engineer at Tech Innovators Inc.",
    description: "Specializes in AI and Machine Learning",
    branch: "CSE",
    year: 2020,
    skills: ["AI", "ML", "Python"],
    company: "Tech Innovators Inc.",
    linkedin: "https://www.linkedin.com/in/emily-harper",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Owen Turner",
    role: "Product Manager at Global Solutions Corp.",
    description: "Experienced in Agile methodologies",
    branch: "ECE",
    year: 2019,
    skills: ["Agile", "Management", "Strategy"],
    company: "Global Solutions Corp.",
    linkedin: "https://www.linkedin.com/in/owen-turner",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sophia Lee",
    role: "UX Designer at Creative Studio",
    description: "Passionate about user experience and interface design",
    branch: "Design",
    year: 2022,
    skills: ["UX", "UI", "Figma"],
    company: "Creative Studio",
    linkedin: "https://www.linkedin.com/in/sophia-lee",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Alumni_Directory = () => {
  const { requests, addRequest } = useContext(MentorshipContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ branch: "", year: "", skill: "", company: "" });
  const [showFilter, setShowFilter] = useState(false);

  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const uniqueBranches = [...new Set(alumniData.map((a) => a.branch))];
  const uniqueYears = [...new Set(alumniData.map((a) => a.year))];
  const uniqueSkills = [...new Set(alumniData.flatMap((a) => a.skills))];
  const uniqueCompanies = [...new Set(alumniData.map((a) => a.company))];

  const filteredAlumni = alumniData.filter((alumni) => {
    const searchMatch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.skills.join(" ").toLowerCase().includes(searchTerm.toLowerCase());

    const filterMatch =
      (filters.branch ? alumni.branch === filters.branch : true) &&
      (filters.year ? alumni.year === Number(filters.year) : true) &&
      (filters.skill ? alumni.skills.includes(filters.skill) : true) &&
      (filters.company ? alumni.company === filters.company : true);

    return searchMatch && filterMatch;
  });

  const hasRequested = (alumni) => requests.some((r) => r.name === alumni.name);

  const handleViewProfile = (alumni) => {
    setSelectedAlumni(alumni);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAlumni(null);
    setShowModal(false);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2" style={{ color: "#4b4bff" }}>Alumni Directory</h1>
        <p className="text-muted">Connect with fellow alumni and expand your network</p>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-2">
        <input
          type="text"
          className="form-control flex-grow-1 shadow-sm"
          placeholder="Search by name, skills, or company"
          style={{ borderRadius: "50px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Dropdown show={showFilter} onToggle={() => setShowFilter(!showFilter)}>
          <Dropdown.Toggle variant="outline-primary" className="rounded-pill px-4 py-2">
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: "250px", padding: "15px" }}>
            <Form.Group className="mb-2">
              <Form.Label>Branch</Form.Label>
              <Form.Select value={filters.branch} onChange={(e) => setFilters({ ...filters, branch: e.target.value })}>
                <option value="">All</option>
                {uniqueBranches.map((b) => <option key={b} value={b}>{b}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Year</Form.Label>
              <Form.Select value={filters.year} onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
                <option value="">All</option>
                {uniqueYears.map((y) => <option key={y} value={y}>{y}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Skill</Form.Label>
              <Form.Select value={filters.skill} onChange={(e) => setFilters({ ...filters, skill: e.target.value })}>
                <option value="">All</option>
                {uniqueSkills.map((s) => <option key={s} value={s}>{s}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Select value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })}>
                <option value="">All</option>
                {uniqueCompanies.map((c) => <option key={c} value={c}>{c}</option>)}
              </Form.Select>
            </Form.Group>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="row g-4">
        {filteredAlumni.map((alumni, index) => (
          <div className="col-12 col-md-6" key={index}>
            <div className="card h-100 shadow-sm rounded-4 overflow-hidden">
              <div className="d-flex flex-column flex-md-row">
                <div style={{ backgroundImage: `url(${alumni.image})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "180px", width: "100%", maxWidth: "180px" }}></div>
                <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    <h5 className="fw-bold mb-1">{alumni.name}</h5>
                    <p className="text-muted mb-1">{alumni.role}</p>
                    <p className="text-secondary small">{alumni.description}</p>
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <Button
                      variant={hasRequested(alumni) ? "secondary" : "success"}
                      disabled={hasRequested(alumni)}
                      onClick={() => addRequest(alumni)}
                    >
                      {hasRequested(alumni) ? "Requested" : "Request Mentorship"}
                    </Button>
                    <Button variant="outline-primary" onClick={() => handleViewProfile(alumni)}>
                      View Profile
                    </Button>
                    {alumni.linkedin && (
                      <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info d-flex align-items-center">
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredAlumni.length === 0 && <div className="text-center text-muted mt-4">No alumni found</div>}
      </div>

      {/* Profile Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Alumni Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlumni && (
            <div className="d-flex flex-column flex-md-row gap-4">
              <div style={{ flex: "0 0 150px" }}>
                <img src={selectedAlumni.image} alt={selectedAlumni.name} className="img-fluid rounded" />
              </div>
              <div>
                <h4>{selectedAlumni.name}</h4>
                <p className="text-muted">{selectedAlumni.role}</p>
                <p>{selectedAlumni.description}</p>
                <p><strong>Branch:</strong> {selectedAlumni.branch}</p>
                <p><strong>Year:</strong> {selectedAlumni.year}</p>
                <p><strong>Company:</strong> {selectedAlumni.company}</p>
                <p><strong>Skills:</strong> {selectedAlumni.skills.map((skill, i) => (
                  <Badge bg="secondary" className="me-1" key={i}>{skill}</Badge>
                ))}</p>
                {selectedAlumni.linkedin && (
                  <a href={selectedAlumni.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info">
                    <FaLinkedin className="me-2" /> LinkedIn Profile
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Alumni_Directory;
