import mongoose from "mongoose";

const alumniProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  branch: String,
  yearOfPassing: Number,
  company: String,
  designation: String,
  skills: [String],
  professionalUpdates: String,
  profileImage: String, // cloud hashed link
  certificates: [String], // cloud hashed links
  isOptedOut: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("AlumniProfile", alumniProfileSchema);
