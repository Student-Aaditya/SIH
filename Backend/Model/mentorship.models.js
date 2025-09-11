const mongoose=require("mongoose");

const mentorshipSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
}, { timestamps: true });

const Mentorship= mongoose.model("Mentorship", mentorshipSchema);
module.exports=Mentorship;