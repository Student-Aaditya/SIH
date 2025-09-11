import React, { useState } from "react";

export default function AlumniDetails({ show, onClose, alumnus }) {
  const [revealed, setRevealed] = useState({ email: false, phone: false });
  const [previewCert, setPreviewCert] = useState(null);

  if (!show || !alumnus) return null;

  function maskEmail(email) {
    if (!email) return "";
    const [left, domain] = email.split("@");
    if (!domain) return email;
    if (left.length <= 2) return left[0] + "*@" + domain;
    return left[0] + "*".repeat(Math.max(3, left.length - 2)) + left.slice(-1) + "@" + domain;
  }
  function maskPhone(phone) {
    const s = String(phone || "");
    if (s.length <= 4) return "*".repeat(s.length);
    const first = s.slice(0, 2);
    const last = s.slice(-2);
    const mid = "*".repeat(Math.max(3, s.length - 4));
    return first + mid + last;
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <h5 style={{margin:0}}>Alumnus Details</h5>
          <div>
            <button className="btn btn-sm btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-3">
            <div style={{width:140,height:140,borderRadius:8,background:'#f5f6f8',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
              {alumnus.profileImage ? <img src={alumnus.profileImage} alt="avatar" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{fontSize:32,fontWeight:700}}>{(alumnus.name||'').split(' ').map(n=>n[0]).slice(0,2).join('')}</div>}
            </div>
          </div>

          <div className="col-md-9">
            <h4 style={{margin:0}}>{alumnus.name}</h4>
            <div style={{color:'#666'}}>@{alumnus.userId} • {alumnus.branch} • {alumnus.graduationYear}</div>

            <div style={{marginTop:8, display:'flex', gap:16}}>
              <div><strong>Company:</strong> {alumnus.company || "—"}</div>
              <div><strong>Position:</strong> {alumnus.position || "—"}</div>
            </div>

            <div style={{marginTop:10}}>
              <strong>Skills:</strong> {(alumnus.skills||[]).join(", ") || "—"}
            </div>

            <div style={{marginTop:10}}>
              <strong>Contact:</strong>
              <div style={{display:'flex', gap:12, marginTop:6, alignItems:'center'}}>
                <div>
                  Email: &nbsp;
                  <code>{revealed.email ? alumnus.email : maskEmail(alumnus.email)}</code>
                  <button className="btn btn-sm btn-outline-secondary ms-2" onClick={()=>setRevealed(prev=>({...prev, email: !prev.email}))}>
                    {revealed.email ? "Hide" : "Show"}
                  </button>
                </div>

                <div>
                  Phone: &nbsp;
                  <code>{revealed.phone ? alumnus.phone : maskPhone(alumnus.phone)}</code>
                  <button className="btn btn-sm btn-outline-secondary ms-2" onClick={()=>setRevealed(prev=>({...prev, phone: !prev.phone}))}>
                    {revealed.phone ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            <div style={{marginTop:12}}>
              <strong>Certificates</strong>
              {(alumnus.certificates||[]).length === 0 ? <div className="text-muted">No certificates</div> : (
                <ul>
                  {alumnus.certificates.map(c => (
                    <li key={c.id} style={{marginBottom:8}}>
                      <div style={{display:'flex', alignItems:'center', gap:12}}>
                        <div style={{minWidth:220}}>
                          <b>{c.title}</b> — <span style={{color:'#555'}}>{c.issueDate}</span>
                        </div>
                        <div style={{fontFamily:'monospace',fontSize:13}}>{c.hash}</div>
                        <div>
                          <button className="btn btn-sm btn-outline-primary" onClick={()=>setPreviewCert(c)}>Preview</button>
                          <a className="btn btn-sm btn-outline-secondary ms-2" href={c.dataUrl} download={c.fileName}>Download</a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        </div>

        {previewCert && (
          <div style={{marginTop:12}}>
            <div style={{borderTop:'1px solid #eee', paddingTop:12}}>
              <h6>Preview: {previewCert.title}</h6>
              <div style={{height:480, border:'1px solid #ddd', borderRadius:6, overflow:'hidden', background:'#fff'}}>
                {previewCert.type && previewCert.type.startsWith("image/") ? (
                  <img src={previewCert.dataUrl} alt={previewCert.title} style={{width:'100%', height:'100%', objectFit:'contain'}} />
                ) : (
                  <iframe title="pdf-preview" src={previewCert.dataUrl} style={{width:'100%', height:'100%', border:0}} />
                )}
              </div>
              <div style={{marginTop:8}}>
                <button className="btn btn-sm btn-secondary me-2" onClick={()=>setPreviewCert(null)}>Close Preview</button>
                <a className="btn btn-sm btn-primary" href={previewCert.dataUrl} download={previewCert.fileName}>Download</a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000
};
const modalStyle = {
  width: 820, maxWidth: "96%", maxHeight: "92vh", overflowY: "auto", background: "#fff", padding: 18, borderRadius: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
};
