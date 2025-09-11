import React, { useState } from "react";
import { fileToHash } from "../../utils/hash";

export default function DonationForm({ alumniList, onClose, onSave }) {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));

  async function handleSubmit() {
    if (!selectedUserId || !amount) {
      alert("Select alumni and enter amount");
      return;
    }

    const transactionId = await fileToHash(selectedUserId + Date.now());
    onSave({
      id: Date.now().toString(36),
      userId: selectedUserId,
      amount: Number(amount),
      date,
      transactionIdHash: transactionId
    });
    onClose();
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h5>Add Offline Donation</h5>
        <div className="mb-3">
          <label>Alumni</label>
          <select className="form-select" value={selectedUserId} onChange={e=>setSelectedUserId(e.target.value)}>
            <option value="">-- Select Alumni --</option>
            {alumniList.map(a => (
              <option key={a.userId} value={a.userId}>{a.name} ({a.userId})</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Amount</label>
          <input type="number" className="form-control" value={amount} onChange={e=>setAmount(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input type="date" className="form-control" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = { position: "fixed", inset: 0, background:"rgba(0,0,0,0.45)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:2000 };
const modalStyle = { width:400, background:"white", padding:20, borderRadius:8 };
