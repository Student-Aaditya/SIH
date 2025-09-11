import React from "react";

export default function EventDetailsModal({ event, alumniList, onClose }) {
  const registeredAlumni = alumniList.filter(a => event.registered.includes(a.userId));

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h5>Event Details: {event.title}</h5>
        <p>Date: {event.date} | Time: {event.time} | Notify: {event.notify ? "Yes" : "No"}</p>
        <h6>Registered Alumni ({registeredAlumni.length})</h6>
        <div style={{maxHeight:300, overflowY:'auto'}}>
          {registeredAlumni.map(a => (
            <div key={a.userId} style={{display:'flex', gap:10, alignItems:'center', marginBottom:6}}>
              {a.profileImage ? <img src={a.profileImage} style={{width:40,height:40,borderRadius:6}} alt="avatar"/> : <div style={{width:40,height:40,background:'#ccc'}}/>}
              <div>{a.name} ({a.branch}, {a.graduationYear})</div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <button className="btn btn-secondary me-2" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000
};
const modalStyle = {
  width: 600, maxWidth: "95%", maxHeight: "80vh", overflowY: "auto", background: "white", padding: 18, borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.25)"
};
