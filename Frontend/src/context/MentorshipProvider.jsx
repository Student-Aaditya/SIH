import React, { useState, useEffect } from "react";
import MentorshipContext from "./MentorshipContext";

const MentorshipProvider = ({ children }) => {
  const [requests, setRequests] = useState(() => {
    return JSON.parse(localStorage.getItem("mentorshipRequests")) || [];
  });

  useEffect(() => {
    localStorage.setItem("mentorshipRequests", JSON.stringify(requests));
  }, [requests]);

  const addRequest = (alumni) => {
    const exists = requests.find((r) => r.name === alumni.name);
    if (!exists) {
      setRequests([...requests, { ...alumni, status: "Pending" }]);
    } else {
      alert("Mentorship request already sent!");
    }
  };

  const updateRequestStatus = (name, status) => {
    setRequests(
      requests.map((r) => (r.name === name ? { ...r, status } : r))
    );
  };

  return (
    <MentorshipContext.Provider value={{ requests, addRequest, updateRequestStatus }}>
      {children}
    </MentorshipContext.Provider>
  );
};

export default MentorshipProvider;
