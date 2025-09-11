import React, { useEffect, useState, useRef } from "react";
import { fileToHash } from "../../utils/hash";

export default function StudentForm({ show, onClose, onSave, initialData }) {
  const [form, setForm] = useState(null);
  const [interestsInput, setInterestsInput] = useState(""); 
  const fileRef = useRef();

  useEffect(() => {
    if (!show) return;
    if (initialData) {
      setForm({
        ...initialData,
        passwordPlain: "",
        certificates: initialData.certificates || []
      });
      setInterestsInput((initialData.interests || []).join(", "));
    } else {
      const now = new Date().getFullYear();
      setForm({
        id: null,
        name: "",
        userId: "",
        branch: "",
        admissionYear: now,
        interests: [],
        phone: "",
        email: "",
        passwordPlain: "",
        passwordHash: "",
        profileImage: "",
        certificates: [],
        isOptedOut: false
      });
      setInterestsInput("");
    }
  }, [initialData, show]);

  if (!show || !form) return null;

  function handleChange(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.userId || !form.email) {
      alert("Please fill Name, UserID and Email.");
      return;
    }

    const toSave = { ...form };

    if (form.passwordPlain && form.passwordPlain.trim()) {
      toSave.passwordHash = await fileToHash(String(form.passwordPlain));
    }
    delete toSave.passwordPlain;

    toSave.interests = interestsInput.split(",").map(s => s.trim()).filter(Boolean);

    if (!toSave.id) toSave.id = Date.now().toString(36) + Math.random().toString(36).slice(2,6);

    onSave(toSave);
  }

  function handleAvatar(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, profileImage: reader.result }));
    reader.readAsDataURL(file);
  }

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const added = await Promise.all(files.map(async (f) => {
      const hash = await fileToHash(f);
      const reader = new FileReader();
      const dataUrl = await new Promise(res => {
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(f);
      });
      return {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2,6),
        fileName: f.name,
        type: f.type,
        dataUrl,
        hash,
        title: f.name,
        issueDate: new Date().toISOString().slice(0,10)
      };
    }));
    setForm(prev => ({ ...prev, certificates: [...(prev.certificates||[]), ...added] }));
    fileRef.current.value = "";
  }

  function removeCert(id) {
    setForm(prev => ({ ...prev, certificates: (prev.certificates||[]).filter(c => c.id !== id) }));
  }

  function updateCertField(id, key, val) {
    setForm(prev => ({
      ...prev,
      certificates: (prev.certificates||[]).map(c => c.id === id ? { ...c, [key]: val } : c)
    }));
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <h5>{form.id ? "Edit Student" : "Add New Student"}</h5>
          <div>
            <button className="btn btn-sm btn-secondary me-2" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={async ()=>{
              await handleSubmit();
              onClose();
            }}>Save</button>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input className="form-control" value={form.name} onChange={e=>handleChange("name",e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">UserID</label>
            <input className="form-control" value={form.userId} onChange={e=>handleChange("userId",e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Admission Year</label>
            <input type="number" className="form-control" value={form.admissionYear} onChange={e=>handleChange("admissionYear",Number(e.target.value))} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Branch</label>
            <input className="form-control" value={form.branch} onChange={e=>handleChange("branch",e.target.value)} />
          </div>

          <div className="col-md-3">
            <label className="form-label">Phone</label>
            <input className="form-control" value={form.phone} onChange={e=>handleChange("phone",e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Email</label>
            <input className="form-control" value={form.email} onChange={e=>handleChange("email",e.target.value)} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password (admin assigns)</label>
            <input className="form-control" value={form.passwordPlain || ""} onChange={e=>handleChange("passwordPlain",e.target.value)} placeholder="Set new password (will be hashed)" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Profile Avatar</label>
            <input type="file" accept="image/*" className="form-control" onChange={e=>handleAvatar(e.target.files[0])} />
            {form.profileImage && <div style={{marginTop:8}}>
              <img src={form.profileImage} alt="avatar" style={{width:80,height:80,objectFit:'cover',borderRadius:8}} />
              <button className="btn btn-sm btn-link" onClick={()=>handleChange("profileImage","")}>Remove</button>
            </div>}
          </div>

          <div className="col-12">
            <label className="form-label">Certificates</label>
            <input ref={fileRef} type="file" accept="application/pdf,image/*" multiple className="form-control" onChange={handleFiles} />
            <div style={{marginTop:8}}>
              {(form.certificates||[]).length === 0 ? <div>No certificates added</div> :
                (form.certificates||[]).map(c=>(
                  <div key={c.id} className="card mb-2 p-2">
                    <div style={{display:'flex',gap:12,alignItems:'center'}}>
                      <div style={{width:64,height:48,overflow:'hidden',borderRadius:6,background:'#fafafa',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        {c.type.startsWith("image/") ? <img src={c.dataUrl} alt={c.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : <div>{c.fileName}</div>}
                      </div>
                      <div style={{flex:1}}>
                        <input className="form-control form-control-sm" style={{flex:1}} value={c.title} onChange={e=>updateCertField(c.id,"title",e.target.value)} />
                        <input type="date" className="form-control form-control-sm mt-1" value={c.issueDate} onChange={e=>updateCertField(c.id,"issueDate",e.target.value)} />
                        <div style={{fontSize:12,marginTop:4}}>Hash: <code style={{wordBreak:'break-all'}}>{c.hash}</code></div>
                      </div>
                      <div>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={()=>window.open(c.dataUrl,"_blank")}>Preview</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={()=>removeCert(c.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="col-12 mt-2">
            <label>
              <input type="checkbox" checked={form.isOptedOut} onChange={e=>handleChange("isOptedOut",e.target.checked)} /> Opt-out of notifications
            </label>
          </div>

        </div>
      </div>
    </div>
  );
}

const overlayStyle = {position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000};
const modalStyle = {width:920,maxWidth:"96%",maxHeight:"90vh",overflowY:"auto",background:"#fff",padding:18,borderRadius:10,boxShadow:"0 8px 30px rgba(0,0,0,0.25)"};
