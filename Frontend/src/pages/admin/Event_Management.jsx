import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./EventForm";
import EventDetailsModal from "./EventDetailsModal";
import { getAllAlumni } from "../../utils/storage";

export default function Event_Management() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [alumniList, setAlumniList] = useState([]);

  useEffect(() => {
    setAlumniList(getAllAlumni());

    async function fetchEvents() {
      try {
        const res = await axios.get("https://sih-3k8l.onrender.com/events");
        setEvents(res.data || []);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }

    fetchEvents();
  }, []);

  const addEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 className="fw-bold">Event Management</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
        Create New Event
      </button>

      <div>
        <h5>Live / Upcoming Events</h5>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <div className="list-group">
            {events.map((evt) => {
              const targetNames = evt.targetAlumni?.map((id) => {
                const alum = alumniList.find((a) => a.userId === id);
                return alum ? alum.name : id;
              });
              return (
                <div
                  key={evt._id || evt.id}
                  className="list-group-item d-flex justify-content-between align-items-center flex-column flex-md-row"
                >
                  <div>
                    <strong>{evt.title}</strong> | {evt.date} {evt.time} | Duration: {evt.duration}h | Registered:{" "}
                    {evt.registered?.length || 0}
                  </div>
                  <div className="mt-2 mt-md-0">
                    <button className="btn btn-sm btn-info me-2" onClick={() => setShowDetails(evt)}>
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showForm && (
        <EventForm
          alumniList={alumniList}
          onClose={() => setShowForm(false)}
          onSave={(evt) => {
            addEvent(evt);
            setShowForm(false);
          }}
        />
      )}

      {showDetails && (
        <EventDetailsModal event={showDetails} alumniList={alumniList} onClose={() => setShowDetails(null)} />
      )}
    </div>
  );
}
