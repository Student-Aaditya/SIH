import React, { useState, useMemo, useEffect } from "react";
import AlumniDetailsModal from "./AlumniDetailsModal";

export default function EventForm({ onClose, onSave, alumniList=[] }) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [selectedAlumni, setSelectedAlumni] = useState([]);
  const [viewAlumni, setViewAlumni] = useState(null);
  const [notifyStudents, setNotifyStudents] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");

  useEffect(()=>{
    setSelectedAlumni([]);
  }, [alumniList]);

  const filteredAlumni = useMemo(() => {
    let list = alumniList.filter(a =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.company||"").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.branch||"").toLowerCase().includes(searchTerm.toLowerCase())
    );

    list.sort((a,b) => {
      if(sortKey === "name") return a.name.localeCompare(b.name);
      if(sortKey === "company") return (a.company||"").localeCompare(b.company||"");
      if(sortKey === "branch") return (a.branch||"").localeCompare(b.branch||"");
      return 0;
    });

    return list;
  }, [alumniList, searchTerm, sortKey]);

  const allSelected = filteredAlumni.length > 0 && filteredAlumni.every(a=>selectedAlumni.includes(a.id));

  function toggleSelectAll() {
    if(allSelected) {
      setSelectedAlumni(prev => prev.filter(id => !filteredAlumni.map(a=>a.id).includes(id)));
    } else {
      setSelectedAlumni(prev => [...new Set([...prev, ...filteredAlumni.map(a=>a.id)])]);
    }
  }

  function handleSave() {
    if(!title || !dateTime) return alert("Fill title and date/time");
    const event = {
      id: Date.now().toString(),
      title,
      date: dateTime.split("T")[0],
      time: dateTime.split("T")[1] || "00:00",
      duration,
      notify: notifyStudents,
      targetAlumni: selectedAlumni,
      registered: [] 
    };
    onSave(event);
  }

  return (
    <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:2000}}>
      <div style={{width:650, background:"white", padding:20, borderRadius:8, maxHeight:"90vh", overflowY:"auto"}}>
        <h5>Add New Event</h5>

        <div className="mb-2">
          <label>Title</label>
          <input className="form-control" value={title} onChange={e=>setTitle(e.target.value)} />
        </div>

        <div className="mb-2">
          <label>Date & Time</label>
          <input type="datetime-local" className="form-control" value={dateTime} onChange={e=>setDateTime(e.target.value)} />
        </div>

        <div className="mb-2">
          <label>Duration (hours)</label>
          <input type="number" min={1} className="form-control" value={duration} onChange={e=>setDuration(e.target.value)} />
        </div>

        <div className="mb-2">
          <label>Search Alumni</label>
          <input className="form-control" placeholder="Search name, company, branch..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
        </div>

        <div className="mb-2">
          <label>Sort By</label>
          <select className="form-select" value={sortKey} onChange={e=>setSortKey(e.target.value)}>
            <option value="name">Name</option>
            <option value="company">Company</option>
            <option value="branch">Branch</option>
          </select>
        </div>

        <div className="mb-2">
          <label>Select Alumni</label>
          <div className="mb-1">
            <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} /> Select All
          </div>
          <div style={{maxHeight:200, overflowY:"auto", border:"1px solid #ccc", padding:5}}>
            {filteredAlumni.map(a=>(
              <div key={a.id} className="d-flex justify-content-between align-items-center mb-1">
                <div>
                  <input type="checkbox" checked={selectedAlumni.includes(a.id)}
                    onChange={e=>{
                      setSelectedAlumni(prev=>{
                        if(e.target.checked) return [...prev,a.id];
                        return prev.filter(x=>x!==a.id);
                      });
                    }} />{" "}
                  {a.name} ({a.company})
                </div>
                <button className="btn btn-sm btn-link" onClick={()=>setViewAlumni(a)}>View Details</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label>
            <input type="checkbox" checked={notifyStudents} onChange={e=>setNotifyStudents(e.target.checked)} /> Notify Students
          </label>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>

        {viewAlumni && 
          <AlumniDetailsModal alumni={viewAlumni} onClose={()=>setViewAlumni(null)} />
        }
      </div>
    </div>
  );
}
