import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaEye, FaTrash, FaSortAlphaDown, FaSortNumericDown } from "react-icons/fa";

import AlumniForm from "../../components/admin/AlumniForm";
import AlumniDetails from "../../components/admin/AlumniDetails";

import { seedInitialIfEmpty, getAllAlumni, addAlumnus, updateAlumnus, deleteAlumnus } from "../../utils/storage";

export default function Alumni_Management() {
  const [alumni, setAlumni] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQ, setSearchQ] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formInitial, setFormInitial] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  useEffect(() => {
    (async () => {
      await seedInitialIfEmpty();
      const data = getAllAlumni();
      setAlumni(data);
      setFiltered(data);
    })();
  }, []);

  useEffect(() => {
    let list = [...alumni];
    if (searchQ) {
      const q = searchQ.toLowerCase();
      list = list.filter(a => (a.name||"").toLowerCase().includes(q) || (a.email||"").toLowerCase().includes(q) || (a.company||"").toLowerCase().includes(q) || (a.userId||"").toLowerCase().includes(q));
    }
    if (filterBranch) list = list.filter(a => a.branch === filterBranch);
    if (filterYear) list = list.filter(a => String(a.graduationYear) === String(filterYear));
    if (sortBy) {
      list.sort((x,y) => {
        if (sortBy === "name") return String(x.name||"").localeCompare(y.name||"");
        if (sortBy === "year") return Number(x.graduationYear||0) - Number(y.graduationYear||0);
        return 0;
      });
    }
    setFiltered(list);
  }, [searchQ, filterBranch, filterYear, sortBy, alumni]);

  function refreshFromStorage() {
    const data = getAllAlumni();
    setAlumni(data);
  }

  function openAdd() {
    setFormInitial(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setFormInitial(item);
    setShowForm(true);
  }

  function onSaveHandler(obj) {
    if (getAllAlumni().some(a => a.id === obj.id)) {
      updateAlumnus(obj);
    } else {
      addAlumnus(obj);
    }
    refreshFromStorage();
  }

  function handleDelete(id) {
    if (!window.confirm("Delete this alumnus? This action cannot be undone.")) return;
    deleteAlumnus(id);
    refreshFromStorage();
  }

  function openDetails(item) {
    setDetailItem(item);
    setShowDetails(true);
  }

  const branchOptions = Array.from(new Set(alumni.map(a => a.branch).filter(Boolean)));
  const yearOptions = Array.from(new Set(alumni.map(a => a.graduationYear).filter(Boolean))).sort((a,b)=>b-a);

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
    <div style={{ padding: 18 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">🎓 Alumni Management</h2>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={() => setSortBy("name")}><FaSortAlphaDown /> Sort Name</button>
          <button className="btn btn-outline-secondary me-2" onClick={() => setSortBy("year")}><FaSortNumericDown /> Sort Year</button>
          <button className="btn btn-primary" onClick={openAdd}><FaPlus /> Add Alumni</button>
        </div>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-md-5">
          <input className="form-control" placeholder="Search by name, email, company or userId" value={searchQ} onChange={e=>setSearchQ(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filterBranch} onChange={e=>setFilterBranch(e.target.value)}>
            <option value="">All Branches</option>
            {branchOptions.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select" value={filterYear} onChange={e=>setFilterYear(e.target.value)}>
            <option value="">All Years</option>
            {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="col-md-2 text-end">
          <button className="btn btn-sm btn-outline-secondary" onClick={()=>{ setSearchQ(""); setFilterBranch(""); setFilterYear(""); setSortBy(""); }}>Reset</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th style={{minWidth:200}}>Name / UserID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Company</th>
                <th className="text-center" style={{minWidth:180}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-4">No alumni found</td></tr>
              ) : filtered.map(a => (
                <tr key={a.id}>
                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:12}}>
                      <div style={{
                        width:48, height:48, borderRadius:8, background:'#f0f0f0',
                        display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700
                      }}>
                        {a.profileImage ? <img src={a.profileImage} alt="avatar" style={{width:48,height:48,objectFit:'cover',borderRadius:8}} /> : (a.name||'').split(' ').map(n=>n[0]).slice(0,2).join('')}
                      </div>
                      <div>
                        <div className="fw-semibold">{a.name}</div>
                        <div style={{fontSize:12,color:'#666'}}>@{a.userId}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <div style={{fontFamily:'monospace'}}>{maskEmail(a.email)}</div>
                    </div>
                  </td>

                  <td>
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <div style={{fontFamily:'monospace'}}>{maskPhone(a.phone)}</div>
                    </div>
                  </td>

                  <td>{a.branch}</td>
                  <td>{a.graduationYear}</td>
                  <td>{a.company}</td>

                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-info" onClick={()=>openDetails(a)}><FaEye /> View</button>
                      <button className="btn btn-sm btn-warning" onClick={()=>openEdit(a)}><FaEdit /> Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(a.id)}><FaTrash /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <AlumniForm
          show={showForm}
          initialData={formInitial}
          onClose={()=>{ setShowForm(false); setFormInitial(null); refreshFromStorage(); }}
          onSave={(obj)=>{ onSaveHandler(obj); }}
        />
      )}

      {showDetails && (
        <AlumniDetails
          show={showDetails}
          alumnus={detailItem}
          onClose={()=>{ setShowDetails(false); setDetailItem(null); refreshFromStorage(); }}
        />
      )}
    </div>
  );
}
