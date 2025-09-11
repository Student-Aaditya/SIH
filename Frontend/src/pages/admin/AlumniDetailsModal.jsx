import React from "react";

export default function AlumniDetailsModal({ alumni, onClose, navigateToAlumni }) {
  if (!alumni) return null;

  function handleNavigate() {
    onClose();
    navigateToAlumni(alumni.userId);
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Alumni Details</h5>
          <button className="btn btn-sm btn-secondary" onClick={onClose}>Close</button>
        </div>

        {alumni.profileImage && <img src={alumni.profileImage} alt="avatar" style={{width:100,height:100,borderRadius:8,marginBottom:10}} />}
        <div><strong>Name:</strong> {alumni.name}</div>
        <div><strong>UserID:</strong> {alumni.userId}</div>
        <div><strong>Email:</strong> {alumni.email}</div>
        <div><strong>Phone:</strong> {alumni.phone}</div>
        <div><strong>Branch:</strong> {alumni.branch}</div>
        <div><strong>Year:</strong> {alumni.graduationYear}</div>
        <div><strong>Company:</strong> {alumni.company}</div>
        <div><strong>Position:</strong> {alumni.position}</div>
        <div><strong>Skills:</strong> {(alumni.skills||[]).join(", ")}</div>

      </div>
    </div>
  );
}

const overlayStyle = { position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:2000 };
const modalStyle = { width:400, background:"white", padding:20, borderRadius:8 };
