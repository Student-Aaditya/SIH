import React, { useEffect, useState } from "react";
import DonationForm from "./DonationForm";
import AlumniDetailsModal from "./AlumniDetailsModal";
import { getAllAlumni } from "../../utils/storage";
import { fileToHash } from "../../utils/hash";

const initialDonations = [
  { id: "d1", userId:"aaditya001", amount:5000, date:"2024-01-05", transactionIdHash:"abcd1234" },
  { id: "d2", userId:"aditya011", amount:3000, date:"2024-02-12", transactionIdHash:"efgh5678" },
];

export default function Donations({ navigateToAlumni }) {
  const [donations, setDonations] = useState(initialDonations);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewAlumni, setViewAlumni] = useState(null);

  const alumniList = getAllAlumni();

  const donationsWithAlumni = donations.map(d => {
    const alum = alumniList.find(a => a.userId === d.userId);
    return { ...d, ...alum };
  });

  const totalAmount = donations.reduce((sum, d) => sum + Number(d.amount || 0), 0);

  function handleAddDonation(newDonation) {
    setDonations(prev => [...prev, newDonation]);
  }

  const filteredDonations = donationsWithAlumni.filter(d => {
    const term = searchTerm.toLowerCase();
    return (
      d.name.toLowerCase().includes(term) ||
      d.userId.toLowerCase().includes(term) ||
      d.branch.toLowerCase().includes(term) ||
      d.graduationYear.toString().includes(term) ||
      (d.email && d.email.toLowerCase().includes(term)) ||
      (d.phone && d.phone.includes(term))
    );
  }).sort((a,b)=>new Date(b.date)-new Date(a.date));

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Donations</h2>
        <button className="btn btn-primary" onClick={()=>setShowForm(true)}>Add Offline Donation</button>
      </div>

      <div className="mb-3">
        <input className="form-control" placeholder="Search by name, branch, year, email..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
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
            {filteredDonations.map(d => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.userId}</td>
                <td>{d.branch}</td>
                <td>{d.graduationYear}</td>
                <td>₹ {d.amount}</td>
                <td>{d.date}</td>
                <td><code style={{wordBreak:'break-all'}}>{d.transactionIdHash}</code></td>
                <td>
                  <button className="btn btn-sm btn-outline-info" onClick={()=>setViewAlumni(d)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && <DonationForm
        alumniList={alumniList}
        onClose={()=>setShowForm(false)}
        onSave={handleAddDonation}
      />}

      {viewAlumni && <AlumniDetailsModal
        alumni={viewAlumni}
        onClose={()=>setViewAlumni(null)}
        navigateToAlumni={navigateToAlumni}
      />}
    </div>
  );
}
