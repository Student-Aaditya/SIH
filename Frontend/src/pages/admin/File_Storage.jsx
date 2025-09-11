import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample data
const userStats = [
  { month: "Jan", alumni: 20, students: 40 },
  { month: "Feb", alumni: 35, students: 60 },
  { month: "Mar", alumni: 50, students: 80 },
  { month: "Apr", alumni: 70, students: 90 },
];

const pieData = [
  { name: "Events", value: 12 },
  { name: "Donations", value: 50000 },
];

const COLORS = ["#007bff", "#28a745"];

const Dashboard = () => {
  const totalAlumni = userStats.reduce((acc, curr) => acc + curr.alumni, 0);
  const totalStudents = userStats.reduce((acc, curr) => acc + curr.students, 0);
  const totalEvents = pieData.find(d => d.name==="Events")?.value || 0;
  const totalDonations = pieData.find(d => d.name==="Donations")?.value || 0;

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Alumni-Student Dashboard</h1>

      <div className="row text-center mb-4">
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Total Alumni</h5>
              <p className="card-text h4 text-primary">{totalAlumni}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Total Students</h5>
              <p className="card-text h4 text-success">{totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Events</h5>
              <p className="card-text h4 text-info">{totalEvents}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Donations</h5>
              <p className="card-text h4 text-danger">₹{totalDonations.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Bar Chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Alumni vs Students</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userStats}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="alumni" fill="#007bff" />
                  <Bar dataKey="students" fill="#28a745" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Events & Donations</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => {
                    if(typeof value === "number") return value.toLocaleString();
                    return value;
                  }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
