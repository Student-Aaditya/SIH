const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema({
  id: { type: String, required: true },
  fileName: String,
  type: String,
  dataUrl: String,   // storing as base64 (not ideal in production, better upload to S3/Cloudinary)
  hash: String,
  title: String,
  issueDate: String
});

const AlumniSchema = new mongoose.Schema({
  id: { type: String, required: true }, // custom id from frontend
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  branch: String,
  graduationYear: Number,
  company: String,
  position: String,
  skills: [String],
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  profileImage: String,
  certificates: [CertificateSchema],
  isOptedOut: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Alumni", AlumniSchema);
