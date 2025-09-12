import React, { useEffect, useState } from "react";
import DonationForm from "./DonationForm";
import AlumniDetailsModal from "./AlumniDetailsModal";
import axios from "axios";

export default function Donations({ navigateToAlumni }) {
  const [donations, setDonations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewAlumni, setViewAlumni] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch donations from backend
  useEffect(() => {
    async function fetchDonations() {
      try {
        const res = await axios.get("https://sih-3k8l.onrender.com/donations/all");
        if (res.data.success) {
          setDonations(res.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching donations:", err);
        setDonations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  function handleAddDonation(newDonation) {
    setDonations((prev) => [...prev, newDonation]);
  }

 const filteredDonations = donationsWithAlumni
  .filter(d => {
    const term = searchTerm.toLowerCase();
    return (
      String(d.name || "").toLowerCase().includes(term) ||
      String(d.userId || "").toLowerCase().includes(term) ||
      String(d.branch || "").toLowerCase().includes(term) ||
      String(d.graduationYear || "").toLowerCase().includes(term) ||
      String(d.email || "").toLowerCase().includes(term) ||
      String(d.phone || "").toLowerCase().includes(term)
    );
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalAmount = donations.reduce(
    (sum, d) => sum + Number(d.amount || 0),
    0
  );

  if (loading) return <p>Loading donations...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Donations</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add Offline Donation
        </button>
      </div>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search by name, branch, year, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <h5>Total Donations: ₹ {totalAmount}</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>UserID</th>
              <th>Branch</th>
              <th>Year</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transaction ID (hashed)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((d) => (
              <tr key={d._id}>
                <td>{d.alumni?.name || "N/A"}</td>
                <td>{d.alumni?.userId || "N/A"}</td>
                <td>{d.alumni?.branch || "N/A"}</td>
                <td>{d.alumni?.graduationYear || "N/A"}</td>
                <td>₹ {d.amount}</td>
                <td>{new Date(d.date).toLocaleDateString()}</td>
                <td>
                  <code style={{ wordBreak: "break-all" }}>
                    {d.transactionIdHash}
                  </code>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-info"
                    onClick={() => setViewAlumni(d.alumni)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <DonationForm
          onClose={() => setShowForm(false)}
          onSave={handleAddDonation}
        />
      )}

      {viewAlumni && (
        <AlumniDetailsModal
          alumni={viewAlumni}
          onClose={() => setViewAlumni(null)}
          navigateToAlumni={navigateToAlumni}
        />
      )}
    </div>
  );
}
