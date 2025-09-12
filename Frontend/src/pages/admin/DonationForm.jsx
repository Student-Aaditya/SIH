import React, { useState, useEffect } from "react";
import { fileToHash } from "../../utils/hash";
import axios from "axios";

export default function DonationForm({ onClose, onSave }) {
  const [alumniList, setAlumniList] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAlumni() {
      try {
        const res = await axios.get("https://sih-3k8l.onrender.com/api/alumni/all");
        if (res.data.success) {
          setAlumniList(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch alumni:", err);
        alert("Could not load alumni list");
      }
    }
    fetchAlumni();
  }, []);

  async function handleSubmit() {
    if (!selectedUserId || !amount) {
      alert("Select alumni and enter amount");
      return;
    }
    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      const transactionId = await fileToHash(selectedUserId + Date.now());

      const res = await axios.post("https://sih-3k8l.onrender.com/donations/create", {
        alumniId: selectedUserId,
        amount: Number(amount),
        date,
        transactionIdHash: transactionId,
      });

      if (res.data.success) {
        alert("Donation added successfully!");
        onSave && onSave(res.data.data);
        onClose && onClose();
      }
    } catch (err) {
      console.error("Donation error:", err);
      const msg = err.response?.data?.message || "Failed to add donation";
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h5>Add Offline Donation</h5>
        <div className="mb-3">
          <label>Alumni</label>
          <select
            className="form-select"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">-- Select Alumni --</option>
            {alumniList.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name} 
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
};
const modalStyle = {
  width: 400,
  background: "white",
  padding: 20,
  borderRadius: 8,
};
