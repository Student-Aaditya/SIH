  // models/Student.js
const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  id: String,
  fileName: String,
  type: String,
  dataUrl: String, // base64 string
  hash: String,
  title: String,
  issueDate: String,
});

const StudentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // frontend-generated ID
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  branch: String,
  admissionYear: Number,
  interests: [String],
  phone: String,
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  profileImage: String, // base64 avatar
  certificates: [CertificateSchema],
  isOptedOut: { type: Boolean, default: false },
});

module.exports = mongoose.model("Student", StudentSchema);
